const express = require("express");
const router = express.Router();
const { setSensorMode, getSensorMode } = require("../controllers/sensorMode");
const { verifySensorToken, verifyToken } = require("../middleware/verifyToken");

router.put("/", verifyToken, setSensorMode);
router.get("/", verifySensorToken, getSensorMode);

module.exports = router;
