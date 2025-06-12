const express = require("express");
const router = express.Router();
const { verifyToken, verifySensorToken } = require("../middleware/verifyToken");
const {
  createWaterBowl,
  getWaterBowl,
  updateBowlWeight,
  updateMaxWaterLevel,
  updateWaterLevel,
  deleteBowl,
} = require("../controllers/waterBowl");

router.post("/", verifySensorToken, createWaterBowl);
router.get("/", verifyToken, getWaterBowl);
router.put("/bowl-weight", verifySensorToken, updateBowlWeight);
router.put("/max-water-level", verifySensorToken, updateMaxWaterLevel);
router.put("/water-level", verifyToken, updateWaterLevel);
router.delete("/", verifyToken, deleteBowl);

module.exports = router;
