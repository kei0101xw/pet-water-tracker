const WaterBowl = require("../models/WaterBowl");

//水入れの登録
const createWaterBowl = async (req, res) => {
  try {
    const newWaterBowl = await WaterBowl.create({
      ...req.body,
      userId: req.user.id, //トークンからのIDを使用
    });
    res.status(200).json(newWaterBowl);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//水入れ情報の取得
const getWaterBowl = async (req, res) => {
  try {
    const bowl = await WaterBowl.findById(req.params.id);
    if (!bowl) return res.status(404).json("水入れが見つかりません");

    //所有者チェック
    if (bowl.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }
    res.status(200).json(bowl);
  } catch (err) {
    res.status(500).json(err);
  }
};

//水入れの更新
const updateBowlWeight = async (req, res) => {
  try {
    const bowl = await WaterBowl.findById(req.params.id);
    if (!bowl) return res.status(404).json("水入れが見つかりません");

    //所有者チェック
    if (bowl.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }

    const updatedBowl = await WaterBowl.findByIdAndUpdate(
      req.params.id,
      { $set: { bowlWeight: req.body.bowlWeight } },
      { new: true }
    );

    res.status(200).json("水入れの重量が更新されました");
  } catch (err) {
    res.status(500).json("サーバーエラーが発生しました");
  }
};

//現在の水の量の更新
const updateWaterLevel = async (req, res) => {
  try {
    const bowl = await WaterBowl.findById(req.params.id);
    if (!bowl) return res.status(404).json("水入れが見つかりません");

    //所有者チェック
    if (bowl.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }

    const updatedBowl = await WaterBowl.findByIdAndUpdate(
      req.params.id,
      { $set: { waterLevel: req.body.waterLevel } },
      { new: true }
    );

    res.status(200).json("水量が更新されました");
  } catch (err) {
    res.status(500).json("サーバーエラーが発生しました");
  }
};

//水入れの削除
const deleteBowl = async (req, res) => {
  try {
    const bowl = await WaterBowl.findById(req.params.id);
    if (!bowl) return res.status(404).json("水入れが見つかりません");

    //所有者チェック
    if (bowl.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }

    const deletedBowl = await WaterBowl.findByIdAndDelete(req.params.id);
    res.status(200).json("水入れが削除されました");
  } catch (err) {
    return res.status(500).json("サーバーエラーが発生しました");
  }
};

module.exports = {
  createWaterBowl,
  getWaterBowl,
  updateBowlWeight,
  updateWaterLevel,
  deleteBowl,
};
