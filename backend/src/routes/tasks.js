const express = require("express");
const router = express.Router();
const {
  createPet,
  createWaterLog,
  getPet,
  getWaterLog,
  updatePet,
  deletePet,
} = require("../controllers/tasks");

router.post("/pets", createPet);

router.post("/water-log", createWaterLog);

router.get("/pets", getPet);

router.get("/water-log", getWaterLog);

router.patch("/pets", updatePet);

router.delete("/pets", deletePet);

module.exports = router;
