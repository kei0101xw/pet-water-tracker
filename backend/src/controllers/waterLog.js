const WaterLog = require("../models/WaterLog");
const WaterBowl = require("../models/WaterBowl");
const Pet = require("../models/Pet");
const { sendLowWaterLevelAlert } = require("../utils/mailer");
const User = require("../models/User");

const DRINK_THRESHOLD = 2; //g 減
const REFILL_THRESHOLD = 5; //g 増

const createWaterLog = async (req, res) => {
  try {
    const petId = req.user.petId;
    const userId = req.user.userId;

    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json("ペットが見つかりません");

    if (pet.userId.toString() !== userId && !req.user.isAdmin) {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }

    const waterBowl = await WaterBowl.findOne({ userId });
    if (!waterBowl) return res.status(404).json("水入れが見つかりません");

    const { result } = req.body;
    const currentWeight = Number(result);
    const currentTime = new Date();

    // 現在の水入れ皿の情報を更新
    waterBowl.allWeight = currentWeight;
    waterBowl.waterLevel = currentWeight - waterBowl.bowlWeight;

    // メール通知処理（25%以下、かつ未通知の場合のみ送信）
    if (
      waterBowl.maxWaterLevel &&
      waterBowl.waterLevel !== null &&
      waterBowl.waterLevel <= waterBowl.maxWaterLevel / 4
    ) {
      if (!waterBowl.alertSent) {
        const user = await User.findById(userId);
        if (user) {
          await sendLowWaterLevelAlert(user.email, user.username);
          waterBowl.alertSent = true;
          console.log("水位低下の通知メールを送信しました");
        }
      }
    } else {
      // 水位が回復した場合、通知フラグをリセット
      if (waterBowl.alertSent) {
        console.log("水位が回復したため、通知フラグをリセットします");
      }
      waterBowl.alertSent = false;
    }

    // 皿が存在しない（空の可能性がある）
    if (currentWeight < waterBowl.bowlWeight + 10) {
      await waterBowl.save();
      return res.status(200).json({ status: "皿が存在しない" });
    }

    const prevWeight = waterBowl.lastWeight ?? currentWeight;
    const diff = currentWeight - prevWeight;
    let status = "変化なし";

    if (diff <= -DRINK_THRESHOLD) {
      const amount = Math.abs(diff);
      await WaterLog.create({
        petId,
        userId,
        timestamp: currentTime,
        amount,
      });
      status = "飲水記録";
    } else if (diff >= REFILL_THRESHOLD) {
      status = "給水";
    }

    waterBowl.lastWeight = currentWeight;
    waterBowl.lastUpdated = currentTime;
    await waterBowl.save();

    res.status(200).json({ status });
  } catch (err) {
    console.error("受信エラー:", err);
    res.status(500).json("サーバーエラー");
  }
};

const getLogsByDate = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.cookies.petId;

    if (!petId) {
      return res.status(400).json({ message: "petIdがクッキーに存在しません" });
    }

    const { date } = req.query; // 例: "2025-06-08"
    if (!date) {
      return res
        .status(400)
        .json({ message: "日付が指定されていません（例: ?date=2025-06-08）" });
    }

    const JST_OFFSET = 9 * 60 * 60000;
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res
        .status(400)
        .json({ message: "無効な日付形式です（YYYY-MM-DD）" });
    }

    // JST 0:00:00 → UTCに変換
    const startJST = new Date(targetDate);
    startJST.setHours(0, 0, 0, 0);
    const startUTC = new Date(startJST.getTime() - JST_OFFSET);

    const endJST = new Date(targetDate);
    endJST.setHours(23, 59, 59, 999);
    const endUTC = new Date(endJST.getTime() - JST_OFFSET);

    const logs = await WaterLog.find({
      userId,
      petId,
      timestamp: {
        $gte: startUTC,
        $lte: endUTC,
      },
    })
      .select("timestamp amount -_id")
      .sort({ timestamp: 1 });

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({
      message: "指定日の水分ログの取得に失敗しました",
      error: err.message,
    });
  }
};

const getWeeklyLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.cookies.petId;
    if (!petId) {
      return res.status(400).json({ message: "petIdがクッキーに存在しません" });
    }

    const JST_OFFSET = 9 * 60 * 60000;
    const queryDateStr = req.query.week;
    let baseJST;

    if (queryDateStr) {
      // クエリの文字列を分解して JST の日付を作る（UTCで 00:00:00 → JST 09:00:00）
      const [year, month, day] = queryDateStr.split("-").map(Number);
      if (!year || !month || !day) {
        return res
          .status(400)
          .json({ message: "無効な日付形式です（YYYY-MM-DD）" });
      }
      const utcMidnight = new Date(Date.UTC(year, month - 1, day)); // UTCの0時
      baseJST = new Date(utcMidnight.getTime() + JST_OFFSET);
    } else {
      baseJST = new Date(Date.now() + JST_OFFSET); // 現在のJST日時
    }

    // JST基準で週の月曜〜日曜の範囲を求める
    const dayOfWeek = baseJST.getDay(); // 0:日〜6:土
    const daysToMonday = (dayOfWeek + 6) % 7; // 月曜まで戻す
    const mondayJST = new Date(baseJST);
    mondayJST.setDate(baseJST.getDate() - daysToMonday);
    mondayJST.setHours(0, 0, 0, 0);

    const sundayJST = new Date(mondayJST);
    sundayJST.setDate(mondayJST.getDate() + 6);
    sundayJST.setHours(23, 59, 59, 999);

    const startUTC = new Date(mondayJST.getTime() - JST_OFFSET);
    const endUTC = new Date(sundayJST.getTime() - JST_OFFSET);

    const logs = await WaterLog.find({
      userId,
      petId,
      timestamp: { $gte: startUTC, $lte: endUTC },
    });

    // 初期化：月〜日までの全日付を 0 にする
    const result = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(mondayJST);
      date.setDate(mondayJST.getDate() + i);
      const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD
      result[dateStr] = 0;
    }

    // ログを日付単位で集計（JSTに変換して分類）
    for (const log of logs) {
      const jstTime = new Date(log.timestamp.getTime() + JST_OFFSET);
      const dateStr = jstTime.toISOString().slice(0, 10);
      if (result[dateStr] !== undefined) {
        result[dateStr] += log.amount;
      }
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("1週間ログ取得エラー:", err);
    res.status(500).json({
      message: "1週間の飲水ログ取得に失敗しました",
      error: err.message,
    });
  }
};

const getDailyTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.cookies.petId;

    if (!petId) {
      return res.status(400).json({ message: "petIdがクッキーに存在しません" });
    }

    const { date } = req.query; // 例: "2025-06-13"
    if (!date) {
      return res
        .status(400)
        .json({ message: "日付が指定されていません（例: ?date=2025-06-13）" });
    }

    const JST_OFFSET = 9 * 60 * 60000;
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res
        .status(400)
        .json({ message: "無効な日付形式です（YYYY-MM-DD）" });
    }

    const startJST = new Date(targetDate);
    startJST.setHours(0, 0, 0, 0);
    const endJST = new Date(targetDate);
    endJST.setHours(23, 59, 59, 999);

    const startUTC = new Date(startJST.getTime() - JST_OFFSET);
    const endUTC = new Date(endJST.getTime() - JST_OFFSET);

    const logs = await WaterLog.find({
      userId,
      petId,
      timestamp: { $gte: startUTC, $lte: endUTC },
    });

    const totalAmount = logs.reduce((sum, log) => sum + log.amount, 0);

    res.status(200).json({ date, total: totalAmount });
  } catch (err) {
    res.status(500).json({
      message: "日ごとの合計取得に失敗しました",
      error: err.message,
    });
  }
};

const deleteTodayLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.cookies.petId;

    if (!petId) {
      return res.status(400).json({ message: "petIdがクッキーに存在しません" });
    }

    const JST_OFFSET = 9 * 60 * 60000;
    const now = new Date(Date.now() + JST_OFFSET);
    now.setHours(0, 0, 0, 0);
    const startUTC = new Date(now.getTime() - JST_OFFSET);

    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    const endUTC = new Date(end.getTime() - JST_OFFSET);

    const result = await WaterLog.deleteMany({
      userId,
      petId,
      timestamp: { $gte: startUTC, $lte: endUTC },
    });

    res.status(200).json({
      message: "本日のログを削除しました",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error("本日ログ削除エラー:", err);
    res.status(500).json({
      message: "本日のログ削除に失敗しました",
      error: err.message,
    });
  }
};

module.exports = {
  createWaterLog,
  getLogsByDate,
  getWeeklyLogs,
  getDailyTotal,
  deleteTodayLogs,
};
