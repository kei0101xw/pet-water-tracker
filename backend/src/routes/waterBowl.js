const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const {
  createWaterBowl,
  getWaterBowl,
  updateBowlWeight,
  updateWaterLevel,
  deleteBowl,
} = require("../controllers/waterBowl");

router.post("/", verifyToken, createWaterBowl);
router.get("/", verifyToken, getWaterBowl);
router.put("/bowl-weight", verifyToken, updateBowlWeight);
router.put("/water-level", verifyToken, updateWaterLevel);
router.delete("/", verifyToken, deleteBowl);

module.exports = router;
