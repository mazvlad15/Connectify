import express from "express";
import protectedRoute from "../middlewares/protectedRoute.js"
import { addPost, getAllPosts, like, unlike, writeComment, getAllComments } from "../controllers/post.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router()

router.post("/add", upload.single("image"), protectedRoute, addPost);
router.get("/all", protectedRoute, getAllPosts);
router.post("/like", protectedRoute, like);
router.post("/unlike", protectedRoute, unlike);
router.post("/comments/add", protectedRoute, writeComment);
router.get("/comments/all", protectedRoute, getAllComments)

export default router;