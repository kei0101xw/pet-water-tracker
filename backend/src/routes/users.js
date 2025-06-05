const express = require("express");
const router = express.Router();
const { updateUser, deleteUser } = require("../controllers/users");
const { verifyToken } = require("../middleware/verifyToken");

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
