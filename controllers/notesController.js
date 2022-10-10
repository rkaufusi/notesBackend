const pool = require("../database.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createNote = async (req, res) => {
  let { notetitle, notebody, userid } = req.body;
  // helper function
  createNoteDB(notetitle, notebody, userid);
  res.send("note created");
};
const deleteNote = async (req, res) => {
  // helper function
  res.send("user deleted");
};
const editNote = async (erq, res) => {
  // helper function
  res.send("note editied");
};

const getNotes = async (req, res) => {
	let id = 1;
  let notes = await getNoteDB(id);
  res.send(notes);
};
// helper functions

const createNoteDB = async (notetitle, notebody, userid) => {
  try {
    await pool.query(
      `INSERT INTO notes (notetitle, notebody, userid) VALUES (?, ?, ?)`,
      [notetitle, notebody, userid]
    );
    return "note created"
  } catch (error) {
    console.log(error);
  }
};

const getNoteDB = async (userid) => {
  try {
    let notes = await pool.query(`SELECT * FROM notes WHERE userid = ?`, [
      userid,
    ]);
		console.log(notes[0])
    return notes[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createNote, deleteNote, editNote, getNotes };
