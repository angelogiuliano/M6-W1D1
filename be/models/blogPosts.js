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
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("blogPostsModel", BlogPostsSchema, "blogPosts");
