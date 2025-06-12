const WaterLog = require("../models/WaterLog");
const WaterBowl = require("../models/WaterBowl");
const Pet = require("../models/Pet");

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

    //現在の水入れ皿の情報を更新
    waterBowl.allWeight = currentWeight;
    waterBowl.waterLevel = currentWeight - waterBowl.bowlWeight;

    //皿が存在しない
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
    }).sort({ timestamp: 1 });

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({
      message: "指定日の水分ログの取得に失敗しました",
      error: err.message,
    });
  }
};

module.exports = {
  createWaterLog,
  getLogsByDate,
};
