const mongoose = require("mongoose");

const SensorTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  isValid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("SensorToken", SensorTokenSchema);
