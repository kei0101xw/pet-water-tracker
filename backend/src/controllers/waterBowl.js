const WaterBowl = require("../models/WaterBowl");

//水入れの登録
const createWaterBowl = async (req, res) => {
  try {
    const newWaterBowl = await WaterBowl.create(req.body);
    res.status(200).json(newWaterBowl);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//水入れ情報の取得
const getWaterBowl = async (req, res) => {
  try {
    const waterBowl = await WaterBowl.findOne({ userId: req.params.userId });
    if (!waterBowl) {
      return res.status(404).json("水入れが見つかりませんでした");
    }
    res.status(200).json(waterBowl);
  } catch (err) {
    res.status(500).json(err);
  }
};

//水入れの更新
const updateBowlWeight = async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const updatedBowl = await WaterBowl.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              bowlWeight: req.body.bowlWeight,
            },
          },
          { new: true }
        );

        if (!updatedBowl) {
          return res.status(404).json("該当する水入れが見つかりません");
        }

        res.status(200).json("水入れの重量が更新されました");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }
  } catch (err) {
    return res.status(500).json("サーバーエラーが発生しました");
  }
};

//現在の水の量の更新
const updateWaterLevel = async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const updatedBowl = await WaterBowl.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              waterLevel: req.body.waterLevel,
            },
          },
          { new: true }
        );

        if (!updatedBowl) {
          return res.status(404).json("該当する水入れが見つかりません");
        }

        res.status(200).json("水量が更新されました");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }
  } catch (err) {
    return res.status(500).json("サーバーエラーが発生しました");
  }
};

//水入れの削除
const deleteBowl = async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await WaterBowl.findByIdAndDelete(req.params.id);
        res.status(200).json("水入れが削除されました");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }
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
