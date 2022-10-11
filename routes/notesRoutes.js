const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());
const {
  createNote,
  deleteNote,
  editNote,
  getNotes,
} = require("../controllers/notesController");

router.post("/create", createNote);

router.delete("/delete", deleteNote);

router.put("/edit", editNote);

router.get("/getnotes", getNotes);

module.exports = router;
