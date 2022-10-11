const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());
const {
  createUser,
  login,
  deleteUser,
	verifyUser
} = require("../controllers/userController");

router.post("/create", createUser);

router.post("/login", login);

router.delete("/delete", deleteUser);

router.post("/verify", verifyUser);

module.exports = router;
