const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    max: 150,
  },
  author: {
    type: String,
    required: true,
    max: 150,
  },
});

const BlogPostsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 250,
    },
    postDate: {
      type: String,
      required: true,
      max: 250,
    },
    picture: {
      type: String,
      required: true,
      max: 250,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
    comments: { type: [CommentSchema], default: [] },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("blogPostsModel", BlogPostsSchema, "blogPosts");
