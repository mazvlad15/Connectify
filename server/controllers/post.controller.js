import Post from "../models/post.model.js";
import cloudinary from "../db/cloudinary.js";

export const addPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const creatorId = req.user._id;
    const cloud = await cloudinary.uploader
      .upload(req.file.path)
      .catch((err) =>
        res.status(400).json({ error: "Error uploading image " + err })
      );
    if (cloud) {
      const image = cloud.secure_url;
      const newPost = new Post({
        title,
        image,
        description,
        creatorId,
      });

      if (newPost) {
        await newPost.save();
        res.status(201).json({ newPost });
      } else {
        res.status(400).json({ error: "Invalid post data" });
      }
    } else {
      res.status(400).json({ error: "Error connect to cloud" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error add post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts) {
      return res.status(400).json({ error: "No posts available" });
    }

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error get all posts" });
  }
};
