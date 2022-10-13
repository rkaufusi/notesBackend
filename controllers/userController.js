const pool = require("../database.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function createUser(req, res) {
  let { firstname, lastname, email, password } = req.body;
  createUserDB(firstname, lastname, email, password);
  res.send("create user");
}
async function login(req, res) {
	let {email, password} = req.body;
	let result = await loginDB(email, password);
  res.json({accessToken: result});
}

async function deleteUser(req, res) {
	let { token } = req.query;
	const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const { userid } = decoded;
	await deleteUserDB(userid);
  res.send("deleted user");
}
//7SKCKn77 or + *
const verifyUser = async (req, res) => {
	let data = req.body.userToken;
	let isValidUser = await verifyUserDB(data);
	if(isValidUser) res.json(true);
	else res.json(false);
}

// helper methods
async function createUserDB(firstname, lastname, email, password) {
	try {
		let encryptedPassword = await bcrypt.hash(password, 10);
		await pool.query(
			`INSERT INTO users (firstname, lastname, email, password) 
			VALUES (?, ?, ?, ?)`,
			[firstname, lastname, email, encryptedPassword]
		);
		return;
	} catch(error) {
		console.log(error);
		return error;
	}
}

async function loginDB(email, password){
	try {
		let [user] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
		const isValidUser = bcrypt.compare(password, user[0].password);
		if(isValidUser){
			const token = jwt.sign({userid: user[0].userid}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});
			return token;
		}
	} catch(error) {
		console.log(error);
		return error;
	}
}

async function deleteUserDB(id){
	await pool.query(`DELETE FROM users WHERE userid = ?`, [id]);
	return;
}

const verifyUserDB = async (token) => {
	const isValidUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	return isValidUser;
}

module.exports = { createUser, login, deleteUser, verifyUser };
