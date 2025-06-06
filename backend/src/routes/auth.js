const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  generateSensorToken,
  logoutUser,
  getMyInfo,
} = require("../controllers/auth");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/sensor", verifyToken, generateSensorToken);
router.post("/logout", logoutUser);
router.get("/me", verifyToken, getMyInfo);

module.exports = router;
