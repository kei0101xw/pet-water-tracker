const mongoose = require("mongoose");

const WaterBowlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  allWeight: {
    type: Number,
    default: null,
  },
  bowlWeight: {
    type: Number,
    required: true,
  },
  waterLevel: {
    type: Number,
    default: null,
  },
  lastWeight: {
    type: Number,
    default: null,
  },
  lastUpdated: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("WaterBowl", WaterBowlSchema);
