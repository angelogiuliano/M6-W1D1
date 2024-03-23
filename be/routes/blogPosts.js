const express = require("express");
const router = express.Router();
const BlogPostSchema = require("../models/blogPosts");

router.get("/getBlogPosts", async (req, res) => {
  try {
    const blogPosts = await BlogPostSchema.find();
    res.status(200).send(blogPosts);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/getBlogPosts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blogPost = await BlogPostSchema.findById(id);

    if (!blogPost) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested blog post doesn't exist",
      });
    }

    res.status(200).send(blogPost);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.post("/createBlogPost", async (req, res) => {
  try {
    const newPost = new BlogPostSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      bornDate: req.body.bornDate,
      avatar: req.body.avatar,
    });
    const postToSave = await newPost.save();
    res.status(201).send({
      statusCode: 201,
      payload: postToSave,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = router;

router.patch("/updateBlogPost/:id", async (req, res) => {
  const { id } = req.params;

  const blogPost = await BlogPostSchema.findById(id);

  if (!blogPost) {
    return res.status(404).send({
      statusCode: 404,
      message: "The requested blog post doesn't exist",
    });
  }

  try {
    const updatedBlogPost = req.body;
    const options = { new: true };

    const result = await BlogPostSchema.findByIdAndUpdate(
      id,
      updatedBlogPost,
      options
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.delete("/deleteBlogPost/:id", async (req, res) => {
  const { id } = req.params;

  const blogPost = await BlogPostSchema.findById(id);

  if (!blogPost) {
    return res.status(404).send({
      statusCode: 404,
      message: "The requested blog post doesn't exist",
    });
  }

  try {
    const result = await BlogPostSchema.findByIdAndDelete(id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});
