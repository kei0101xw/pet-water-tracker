const mongoose = require("mongoose");

const SensorModeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  mode: {
    type: String,
    enum: ["normal", "register", "off"],
    default: "off",
  },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SensorMode", SensorModeSchema);
