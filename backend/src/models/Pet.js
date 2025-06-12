const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  species: {
    type: String,
    enum: ["dog", "cat"],
    required: true,
  },
  breed: {
    type: String,
    trim: true,
  },
  weightKg: {
    type: Number,
    required: true,
  },
  birthdate: {
    type: Date,
  },
  recommendedWaterMl: {
    type: Number,
  },
  dangerousWaterMl: {
    type: Number,
  },
});

module.exports = mongoose.model("Pet", PetSchema);
