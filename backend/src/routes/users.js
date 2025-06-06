const express = require("express");
const router = express.Router();
const { updateUser, deleteUser } = require("../controllers/users");
const { verifyToken } = require("../middleware/verifyToken");

router.put("/", verifyToken, updateUser);
router.delete("/", verifyToken, deleteUser);

module.exports = router;
