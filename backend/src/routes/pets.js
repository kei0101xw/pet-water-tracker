const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const {
  createPet,
  getMyPet,
  updatePet,
  deletePet,
} = require("../controllers/pets");

router.post("/", verifyToken, createPet);

router.get("/mine", verifyToken, getMyPet);

router.put("/mine", verifyToken, updatePet);

router.delete("/mine", verifyToken, deletePet);

module.exports = router;
