const pool = require("../database.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createNote = async (req, res) => {
  let { notetitle, notebody, token } = req.body;
	console.log('my user token' + notetitle);
	const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const { userid } = decoded;
  await createNoteDB(notetitle, notebody, userid);
  res.send("note created");
};
const deleteNote = async (req, res) => {
  let { noteid } = req.body;
  console.log(req.body);
  console.log(noteid);
  await deleteNoteDB(noteid);
  res.send("note deleted");
};
const editNote = async (req, res) => {
  let { notetitle, notebody, noteid } = req.body;
  await editNoteDB(notetitle, notebody, noteid);
  res.send("note editied");
};

const getNotes = async (req, res) => {
  let { token } = req.query;
  console.log("my data ", token);
  const userToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const { userid } = userToken;
	console.log(userid)
  let notes = await getNoteDB(userid);
  res.send(notes);
};
// helper functions

const createNoteDB = async (notetitle, notebody, userid) => {
  try {
    await pool.query(
      `INSERT INTO notes (notetitle, notebody, userid) VALUES (?, ?, ?)`,
      [notetitle, notebody, userid]
    );
    return "note created";
  } catch (error) {
    console.log(error);
  }
};

const getNoteDB = async (userid) => {
  try {
    let notes = await pool.query(`SELECT * FROM notes WHERE userid = ?`, [
      userid,
    ]);
    console.log(notes[0]);
    return notes[0];
  } catch (error) {
    console.log(error);
  }
};

const deleteNoteDB = async (noteid) => {
  try {
    await pool.query(`DELETE FROM notes where noteid = ?`, [noteid]);
    return;
  } catch (error) {
    console.log(error);
  }
};

const editNoteDB = async (noteTitle, noteBody, noteid) => {
  try {
    await pool.query(
      `UPDATE notes SET notetitle = ?, notebody = ? WHERE noteid = ?`,
      [noteTitle, noteBody, noteid]
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createNote, deleteNote, editNote, getNotes };
