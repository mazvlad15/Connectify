import Post from "../models/post.model.js";
import cloudinary from "../db/cloudinary.js";
import Comment from "../models/comment.model.js";
import { io } from "../socket/socket.js";

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

      await newPost.save();

      const populatedPost = await newPost.populate(
        "creatorId",
        "fullName profilePicture"
      );

      res.status(201).json({ newPost: populatedPost });

      io.emit("newPost", populatedPost);
    } else {
      res.status(400).json({ error: "Error connecting to cloud" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error adding post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("creatorId", "fullName profilePicture")
      .exec();

    if (!posts || posts.length === 0) {
      return res.status(400).json({ error: "No posts available" });
    }

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error get all posts" });
  }
};

export const like = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.body.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ error: "Post with this id doesn't exist" });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: "You already liked this post" });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: "Liked post successfully" });

    io.emit(`likePost:${postId}`, { postId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error like" });
  }
};

export const unlike = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.body.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ error: "Post with this id doesn't exist" });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ error: "You have not liked this post" });
    }

    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());

    await post.save();

    res.status(200).json({ message: "Unliked post successfully" });

    io.emit(`unlikePost:${postId}`, { postId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error unlike" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.body.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ error: "No post with this id" });
    }

    if (userId.toString() !== post.creatorId.toString()) {
      return res
        .status(400)
        .json({ error: "Only the creator can delete the post" });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });

    io.emit("deletePost", { postId });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error delete post" });
  }
};

export const writeComment = async (req, res) => {
  try {
    const creatorId = req.user._id;
    const { postId, comment } = req.body;

    const post = await Post.findById(postId);
    if (post) {
      const newComment = new Comment({
        comment,
        creatorId,
        postId,
      });

      if (newComment) {
        await newComment.save();
        post.comments.push(newComment);
        await post.save();

        await newComment.populate("creatorId", "fullName profilePicture");

        io.emit("newComment", newComment);

        return res.status(200).json(newComment);
      } else {
        return res.status(400).json({ error: "Error to add comment" });
      }
    } else {
      return res.status(400).json({ error: "Post with this id not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error write comment" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const postId = req.query.postId;

    const comments = await Post.findById(postId)
      .populate({
        path: "comments",
        populate: {
          path: "creatorId",
          select: "fullName profilePicture",
        },
      })
      .select("comments");

    if (comments) {
      return res.status(200).json(comments);
    } else {
      return res.status(404).json({ error: "Post with this ID not found" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Internal server error while fetching comments" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const commentId = req.body.commentId;

    const comment = await Comment.findById(commentId);

    console.log(comment.creatorId);
    console.log(userId);

    if (!comment) {
      return res.status(400).json({ error: "No comment finding" });
    }

    if (userId.toString() !== comment.creatorId.toString()) {
      return res
        .status(400)
        .json({ error: "Only creator can delete the comment" });
    }

    await Comment.findByIdAndDelete(commentId);

    await Post.updateMany(
      { comments: commentId },
      { $pull: { comments: commentId } }
    );

    res.status(200).json({ message: "Comment deleted successfully" });

    io.emit("deleteComment", { commentId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error delete comment" });
  }
};
