// models/WaterLog.js

const mongoose = require("mongoose");

const WaterLogSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  deviceId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  waterLevel: {
    type: Number, // ml単位
    required: true,
  },
  waterDrank: {
    type: Number, // 前回からの差分（ml）
    default: 0,
  },
});

module.exports = mongoose.model("WaterLog", WaterLogSchema);
