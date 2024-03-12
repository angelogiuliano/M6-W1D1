const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const port = 3001;

const app = express();

// import delle routes
const authorsRoute = require("./routes/authors/authors");

// middleware
app.use(express.json());

app.use("/", authorsRoute);

// connessione db
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Db connection error"));
db.once("open", () => {
  console.log("Db connected succesfully");
});

app.listen(port, () => {
  console.log(`Server connected and listening on port ${port}`);
});
