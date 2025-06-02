const express = require("express");
const router = express.Router();
const {
  createPet,
  getPet,
  updatePet,
  deletePet,
} = require("../controllers/pets");

router.post("/pets", createPet);

router.get("/pets", getPet);

router.patch("/pets", updatePet);

router.delete("/pets", deletePet);

module.exports = router;
