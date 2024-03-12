const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      max: 250,
    },
    lastName: {
      type: String,
      required: true,
      max: 250,
    },
    email: {
      type: String,
      required: true,
      max: 250,
    },
    bornDate: {
      type: String,
      required: true,
      max: 250,
    },
    avatar: {
      type: String,
      required: true,
      max: 250,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("authorModel", AuthorSchema, "authors");
