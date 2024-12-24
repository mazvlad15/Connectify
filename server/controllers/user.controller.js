import cloudinary from "../db/cloudinary.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { io } from "../socket/socket.js";

export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    if (!users) {
      return res.status(400).json({ error: "No users found" });
    } else {
      return res.status(201).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error get all users" });
  }
};

export const modifyUserProfilePicture = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User with this id didn't exists" });
    }
    const cloud = await cloudinary.uploader
      .upload(req.file.path)
      .catch((err) =>
        res.status(400).json({ error: "Error uploading image " + err })
      );

    if (cloud) {
      const newProfilePicture = cloud.secure_url;
      user.profilePicture = newProfilePicture;

      const updatedUser = await user.save();

      if (updatedUser) {
        res.status(200).json({
          message: "Successfully changed profile picture",
          newProfilePicture,
        });
      } else {
        res.status(400).json({ error: "Error updating profile picture" });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error modify user profile picture" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const posts = await Post.find({ creatorId: userId })
      .populate("creatorId", "fullName profilePicture")
      .exec();

    if (!posts) {
      return res.status(400).json({ error: "Posts didn't found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error get users posts" });
  }
};
