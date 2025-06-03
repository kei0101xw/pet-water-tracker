const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  createWaterBowl,
  getWaterBowl,
  updateBowlWeight,
  updateWaterLevel,
  deleteBowl,
} = require("../controllers/waterBowl");

router.post("/", verifyToken, createWaterBowl);
router.get("/:id", verifyToken, getWaterBowl);
router.put("/:id/bowl-weight", verifyToken, updateBowlWeight);
router.put("/:id/water-level", verifyToken, updateWaterLevel);
router.delete("/:id", verifyToken, deleteBowl);

module.exports = router;
