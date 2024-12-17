import express from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import {
  getAllUsers,
  getUserPosts,
  modifyUserProfilePicture,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", protectedRoute, getAllUsers);
router.patch(
  "/profile/modify",
  upload.single("image"),
  protectedRoute,
  modifyUserProfilePicture
);
router.get("/posts", protectedRoute, getUserPosts);


export default router;
