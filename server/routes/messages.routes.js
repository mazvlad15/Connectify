import express from "express";
import protectedRoute from "../middlewares/protectedRoute.js"
import { getAllConversations, getAllMessages, getChatId, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:id", protectedRoute, sendMessage);
router.get("/conversations/all", protectedRoute, getAllConversations);
router.get("/chat/:chatId", protectedRoute, getAllMessages);
router.post("/get/chatId", protectedRoute, getChatId);

export default router;