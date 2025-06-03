const WaterLog = require("../models/WaterLog");
const WaterBowl = require("../models/WaterBowl");
const Pet = require("../models/Pet");
const DRINK_THRESHOLD = 2; // g 減
const REFILL_THRESHOLD = 5; // g 増

const createWaterLog = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId);
    if (!pet) return res.status(404).json("ペットが見つかりません");

    if (pet.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }

    const waterBowl = await WaterBowl.findOne({ userId: req.user.id });
    if (!waterBowl) return res.status(404).json("水入れが見つかりません");

    const { date, result } = req.body;
    const currentWeight = Number(result);
    const currentTime = new Date(date);

    //現在の水入れ皿の情報を更新
    waterBowl.allWeight = currentWeight;
    waterBowl.waterLevel = currentWeight - waterBowl.bowlWeight;

    // 補給中：皿が存在しない（交換中）
    if (currentWeight < waterBowl.bowlWeight + 10) {
      await waterBowl.save();
      return res.status(200).json({ status: "皿が存在しない" });
    }

    const prevWeight = waterBowl.lastWeight ?? currentWeight;
    const diff = currentWeight - prevWeight;
    let status = "変化なし";

    if (diff <= -DRINK_THRESHOLD) {
      // 飲水と判定
      const amount = Math.abs(diff);
      await WaterLog.create({
        petId: pet._id,
        userId: req.user.id,
        timestamp: currentTime,
        amount,
      });
      status = "飲水記録";
    } else if (diff >= REFILL_THRESHOLD) {
      status = "給水";
    }

    //WaterBowlの状態を更新
    waterBowl.lastWeight = currentWeight;
    waterBowl.lastUpdated = currentTime;
    await waterBowl.save();

    res.status(200).json({ status });
  } catch (err) {
    console.error("受信エラー:", err);
    res.status(500).json("サーバーエラー");
  }
};

module.exports = {
  createWaterLog,
};
