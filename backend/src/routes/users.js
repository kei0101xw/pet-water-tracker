const express = require("express");
const router = express.Router();
const { updateUser, deleteUser } = require("../controllers/users");

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
