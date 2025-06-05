const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const {
  createPet,
  getPet,
  updatePet,
  deletePet,
} = require("../controllers/pets");

router.post("/", verifyToken, createPet);

router.get("/:id", verifyToken, getPet);

router.put("/:id", verifyToken, updatePet);

router.delete("/:id", verifyToken, deletePet);

module.exports = router;
