const express = require("express");
const router = express.Router();
const {
  createWaterLog,
  getLogsByDate,
  getWeeklyLogs,
  getDailyTotal,
  deleteTodayLogs,
} = require("../controllers/waterLog");
const { verifySensorToken, verifyToken } = require("../middleware/verifyToken");

router.post("/", verifySensorToken, createWaterLog);
router.get("/", verifyToken, getLogsByDate); //?date=2025-06-09などで指定
router.get("/week", verifyToken, getWeeklyLogs); //?week=2025-06-09などで指定（その日付を含む月曜から日曜のデータを表示）
router.get("/daily-total", verifyToken, getDailyTotal);
router.delete("/today", verifyToken, deleteTodayLogs);

module.exports = router;
