const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  deleteUser,
} = require("../controllers/userController");

router.post("/create", createUser);

router.post("/login", login);

router.delete("/delete", deleteUser);

//router.get("/:firstname", getNotes);

module.exports = router;
