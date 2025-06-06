const WaterBowl = require("../models/WaterBowl");

// 水入れの登録
const createWaterBowl = async (req, res) => {
  try {
    const existingBowl = await WaterBowl.findOne({ userId: req.user.id });
    if (existingBowl) {
      return res.status(400).json("既に水入れ皿が登録されています");
    }

    const newWaterBowl = await WaterBowl.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(200).json(newWaterBowl);
  } catch (err) {
    console.error(err);
    res.status(500).json("サーバーエラーが発生しました");
  }
};

// 水入れ情報の取得
const getWaterBowl = async (req, res) => {
  try {
    const bowl = await WaterBowl.findOne({ userId: req.user.id });
    if (!bowl) return res.status(404).json("水入れが見つかりません");

    res.status(200).json(bowl);
  } catch (err) {
    console.error(err);
    res.status(500).json("サーバーエラーが発生しました");
  }
};

// 水入れの重量の更新
const updateBowlWeight = async (req, res) => {
  try {
    const bowl = await WaterBowl.findOne({ userId: req.user.id });
    if (!bowl) return res.status(404).json("水入れが見つかりません");

    bowl.bowlWeight = req.body.bowlWeight;
    await bowl.save();

    res.status(200).json("水入れの重量が更新されました");
  } catch (err) {
    console.error(err);
    res.status(500).json("サーバーエラーが発生しました");
  }
};

// 水量の更新
const updateWaterLevel = async (req, res) => {
  try {
    const bowl = await WaterBowl.findOne({ userId: req.user.id });
    if (!bowl) return res.status(404).json("水入れが見つかりません");

    bowl.waterLevel = req.body.waterLevel;
    await bowl.save();

    res.status(200).json("水量が更新されました");
  } catch (err) {
    console.error(err);
    res.status(500).json("サーバーエラーが発生しました");
  }
};

// 水入れの削除
const deleteBowl = async (req, res) => {
  try {
    const bowl = await WaterBowl.findOne({ userId: req.user.id });
    if (!bowl) return res.status(404).json("水入れが見つかりません");

    await WaterBowl.deleteOne({ userId: req.user.id });

    res.status(200).json("水入れが削除されました");
  } catch (err) {
    console.error(err);
    res.status(500).json("サーバーエラーが発生しました");
  }
};

module.exports = {
  createWaterBowl,
  getWaterBowl,
  updateBowlWeight,
  updateWaterLevel,
  deleteBowl,
};
