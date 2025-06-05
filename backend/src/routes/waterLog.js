const express = require("express");
const router = express.Router();
const { createWaterLog } = require("../controllers/waterLog");
const { verifySensorToken } = require("../middleware/verifyToken");

// :petId をパスパラメータとして受け取る
router.post("/:petId", verifySensorToken, createWaterLog);

module.exports = router;
