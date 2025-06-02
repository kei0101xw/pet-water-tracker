const express = require("express");
const router = express.Router();
const {
  createWaterBowl,
  getWaterBowl,
  updateBowlWeight,
  updateWaterLevel,
  deleteBowl,
} = require("../controllers/waterBowl");

router.post("/", createWaterBowl);
router.get("/:userId", getWaterBowl);
router.put("/:id/bowl-weight", updateBowlWeight);
router.put("/:id/water-level", updateWaterLevel);
router.delete("/:id", deleteBowl);

module.exports = router;
