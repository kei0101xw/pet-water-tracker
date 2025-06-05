const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  generateSensorToken,
} = require("../controllers/auth");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/sensor", verifyToken, generateSensorToken);

module.exports = router;
