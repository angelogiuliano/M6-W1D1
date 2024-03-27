const express = require("express");
const router = express.Router();
const BlogPostSchema = require("../models/blogPosts");
const verified = require("../middlewares/verifyToken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "authorsUploads",
    public_id: (req, file) => file.name,
  },
});

const cloudUpload = multer({ storage: cloudStorage });

router.post("/uploadImg", cloudUpload.single("picture"), async (req, res) => {
  try {
    res.status(200).json({ source: req.file.path });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "File upload error",
    });
  }
});

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

router.get('/:id/comments', async (req, res) => {
  const {id} = req.params

  try {
    const blogPost = await BlogPostSchema.findById(id);

    if (!blogPost) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested blog post doesn't exist",
      });
    }

    res.status(200).send(blogPost.comments);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
})

router.post("/createBlogPost", async (req, res) => {
  try {
    const newPost = new BlogPostSchema({
      title: req.body.title,
      postDate: req.body.postDate,
      picture: req.body.picture,
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

router.post("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;

    const blogPost = await BlogPostSchema.findById(id);

    if (!blogPost) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested blog post doesn't exist",
      });
    }

    const newComment = {
      text: req.body.text,
      author: req.body.author,
    };

    console.log(newComment);

    blogPost.comments.push(newComment);
    await blogPost.save();
    res.status(201).send(blogPost);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = router;
