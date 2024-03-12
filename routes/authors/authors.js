const express = require("express");
const router = express.Router();
const AuthorsModel = require("../../models/authors");

router.get("/getAuthors", async (req, res) => {
  try {
    const authors = await AuthorsModel.find();
    res.status(200).send(authors);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/getAuthors/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const author = await AuthorsModel.findById(id);

    if (!author) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested author doesn't exist",
      });
    }

    res.status(200).send(author);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.post("/createAuthor", async (req, res) => {
  try {
    const newAuthor = new AuthorsModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      bornDate: req.body.bornDate,
      avatar: req.body.avatar,
    });
    const authorToSave = await newAuthor.save();
    res.status(201).send({
      statusCode: 201,
      payload: authorToSave,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = router;
