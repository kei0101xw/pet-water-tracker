const Pet = require("../models/Pet");

const createPet = async (req, res) => {
  try {
    const newPet = await Pet.create(req.body);
    res.status(200).json(newPet);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const getPet = async (req, res) => {
  try {
    const allTask = await Pet.find({});
    res.status(200).json(allTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePet = async (req, res) => {};
const deletePet = async (req, res) => {};

module.exports = {
  createPet,
  getPet,
  updatePet,
  deletePet,
};
