import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import usersRouter from "./routes/users.routes.js";
import postsRouter from "./routes/posts.routes.js";

import cors from "cors";
import dotenv from "dotenv";
import connectToMongoDb from "./db/connectToMongoDB.js";
dotenv.config({path: "../.env"});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server started on port ${PORT}`);
});
