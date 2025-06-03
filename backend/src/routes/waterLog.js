const express = require("express");
const router = express.Router();
const { createWaterLog } = require("../controllers/waterLog");
const verifyToken = require("../middleware/verifyToken");

// :petId をパスパラメータとして受け取る
router.post("/:petId", verifyToken, createWaterLog);

module.exports = router;
