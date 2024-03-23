const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = 3001;

const app = express();

// import delle routes
const blogPostsRoute = require("./routes/blogPosts");
const loginRoute = require('./routes/login')
const usersRoute = require('./routes/users')

// middleware
app.use(express.json());
app.use(cors());

app.use("/", blogPostsRoute);
app.use("/", loginRoute)
app.use("/", usersRoute)

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
