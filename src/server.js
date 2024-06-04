import dotenv from "dotenv";
import express from "express";
import createError from "http-errors";
import connectMongoDB from "./db/connectDB.js";
import authRouter from "./routes/authRouter.js";
const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello form the chatbot application.");
});

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
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});