const express = require("express");
const router = express.Router();
const { createNote, deleteNote, editNote, getNotes } = require("../controllers/notesController");

router.post("/create", createNote);

router.delete("/delete", deleteNote);

router.post("/edit", editNote);

router.get("/getnotes", getNotes);

module.exports = router;
