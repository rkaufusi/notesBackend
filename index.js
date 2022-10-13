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

app.listen(process.env.PORT, (req, res) => console.log(`Listening on ${process.env.PORT}`));
