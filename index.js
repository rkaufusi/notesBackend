const express = require("express");
const pool = require ("./database.js");
const userRoutes = require("./routes/userRoutes")
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

app.use("/", userRoutes);

app.listen(process.env.PORT, (req, res) => console.log(process.env.PORT));