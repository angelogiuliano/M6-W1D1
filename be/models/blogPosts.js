const mongoose = require("mongoose");

const BlogPostSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
    max: 250,
  },
  title: {
    type: String,
    required: true,
    max: 250,
  },
  cover: {
    type: String,
    required: true,
    max: 250,
  },
  readTime: {
    type: Number,
    required: true,
    max: 250,
  },
  author: {
    type: String,
    required: true,
    max: 250,
  }
});
