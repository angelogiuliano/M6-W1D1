const mongoose = require("mongoose");

const BlogPostsSchema = mongoose.Schema(
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

module.exports = mongoose.model("blogPostsModel", BlogPostsSchema, "blogPosts");
