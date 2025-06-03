const mongoose = require("mongoose");

const WaterLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  bowlWeight: {
    type: Number, // g単位
    required: true,
  },
  waterLevel: {
    type: Number, // ml単位
    default: 0, //登録時は水の量を0として記録
  },
  waterDrank: {
    // 前回からの差分（ml）
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("WaterLog", WaterLogSchema);
