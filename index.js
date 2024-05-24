import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import serviceRoutes from "./routes/service.route.js";
import findNearestRoutes from "./routes/findNearest.route.js"
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";


dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();

app.use(cors({
  origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(cookieParser());

server.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port ${ process.env.PORT || 3000 }`);
});

app.use("/api/user", UserRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/findnearest", findNearestRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
