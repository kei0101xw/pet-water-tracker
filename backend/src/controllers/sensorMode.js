const SensorMode = require("../models/SensorMode");

const setSensorMode = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mode } = req.body;

    //日常の分析モード、お皿や最大値の登録モード、オフの３種類がある
    if (
      !["normal", "register-bowl", "register-max-water-level", "off"].includes(
        mode
      )
    ) {
      return res.status(400).json({ message: "無効なモードです" });
    }

    const updated = await SensorMode.findOneAndUpdate(
      { userId },
      { mode, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ message: "モードを更新しました", mode: updated.mode });
  } catch (err) {
    console.error("モード更新エラー:", err);
    res.status(500).json({ message: "モードの更新に失敗しました" });
  }
};

const getSensorMode = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sensorMode = await SensorMode.findOne({ userId });

    res.status(200).json({ mode: sensorMode?.mode || "normal" });
    console.log("取得したsensorMode:", sensorMode);
  } catch (err) {
    res.status(500).json({ message: "モード取得に失敗しました" });
  }
};

module.exports = { setSensorMode, getSensorMode };
