const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

pool.query(`CREATE TABLE if not exists users (
		userid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
		firstname varchar(255),
		lastname varchar(255),
		email varchar(255),
		password varchar(255)
	)`);

pool.query(`CREATE TABLE if not exists notes (
		noteid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
		notetitle varchar(255),
		notebody text,
		userid int,
		FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
	)`);

module.exports = pool;
