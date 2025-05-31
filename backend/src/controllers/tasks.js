const Pet = require("../models/Pet");
const WaterLog = require("../models/WaterLog");

const createPet = async (req, res) => {
  try {
    const createPet = await Pet.create(req.body);
    res.status(200).json(createPet);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const createWaterLog = async (req, res) => {};

const getPet = async (req, res) => {
  try {
    const allTask = await Pet.find({});
    res.status(200).json(allTask);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getWaterLog = async (req, res) => {};
const updatePet = async (req, res) => {};
const deletePet = async (req, res) => {};

module.exports = {
  createPet,
  createWaterLog,
  getPet,
  getWaterLog,
  updatePet,
  deletePet,
};
