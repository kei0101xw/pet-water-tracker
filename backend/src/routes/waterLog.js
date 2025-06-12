const express = require("express");
const router = express.Router();
const { createWaterLog, getLogsByDate } = require("../controllers/waterLog");
const { verifySensorToken, verifyToken } = require("../middleware/verifyToken");

// URLから petId を削除
router.post("/", verifySensorToken, createWaterLog);
router.get("/", verifyToken, getLogsByDate);

module.exports = router;
