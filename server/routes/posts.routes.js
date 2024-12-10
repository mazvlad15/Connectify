import express from "express";
import protectedRoute from "../middlewares/protectedRoute.js"
import { addPost, getAllPosts } from "../controllers/post.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router()

router.post("/add", upload.single("image"), protectedRoute, addPost);
router.get("/all", protectedRoute, getAllPosts);

export default router;