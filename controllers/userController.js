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
  res.send(result);
}
function deleteUser(req, res) {
	//deleteUserDB()
  res.send("delete user");
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
		let [[user]] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
		const isValidUser = bcrypt.compare(password, user.password);
		if(isValidUser){
			const token = jwt.sign({userid: user.userid}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});
			return token;
		}
	} catch(error) {
		console.log(error);
		return error;
	}
}

async function deleteUserDB(id){
	await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
	return;
}


module.exports = { createUser, login, deleteUser };
