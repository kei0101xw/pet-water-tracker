const express = require("express");
const router = express.Router();
const { createWaterLog } = require("../controllers/waterLog");
const { verifySensorToken } = require("../middleware/verifyToken");

// URLから petId を削除
router.post("/", verifySensorToken, createWaterLog);

module.exports = router;
