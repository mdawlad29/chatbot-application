import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import createError from "http-errors";
import connectMongoDB from "./db/connectDB.js";
import authRouter from "./routes/authRouter.js";
import messageRouter from "./routes/messageRouter.js";
import userRouter from "./routes/usersRouter.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello form the chatbot application.");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

app.use((req, res, next) => {
  next(createError(404, "Routes not found!"));
});

app.use((err, req, res, next) => {
  return res.status(err.status).json({
    status: err.status,
    message: err.message,
  });
});

connectMongoDB();
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
