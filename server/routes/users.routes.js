import express from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/all", protectedRoute, getAllUsers);


export default router;