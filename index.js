const express = require("express");
const pool = require("./database.js");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/notes", notesRoutes);
/*
app.use((err, req, res, next) => {
	console.log("we're at the error")
  console.error(err.stack);
  res.status(500).send("Something broke!");
});*/

app.listen(process.env.PORT, (req, res) =>
  console.log(`Listening on ${process.env.PORT}`)
);
