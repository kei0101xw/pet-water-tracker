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
  //犬種猫種
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
});

module.exports = mongoose.model("Pet", PetSchema);
