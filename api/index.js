import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import serviceRoutes from "./routes/service.route.js";
import findNearestRoutes from "./routes/findNearest.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import { WebSocket, WebSocketServer } from "ws";
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

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const server = http.createServer(app);

export const wss = new WebSocketServer({ server });

const clients = new Map();
console.log(clients);

wss.on("connection", (ws, req) => {
  // Use query parameters to identify the user
  const params = new URLSearchParams(req.url.split("?")[1]);
  const userId = params.get("userId");
  console.log("connected : "+ userId)

  if (userId) {
    clients.set(userId, ws);

    ws.on("close", () => {
      clients.delete(userId);
      console.log("disconnect : " + userId);
    });

    ws.on("message", (message) => {
      console.log(` ${userId} is on the way : ${message}`);
    });
  }
});
export const sendRequest = async(req, result, userData) => {
  for (let i = 0; i < result.length; i++) {
    const client = clients.get(result[i].userId);
    console.log(result[i].userId);
    // console.log(clients);
    const data = req.body

    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "data", data: {data , userData} }));
      return result[i].userId;
    }
  }
};

app.use(express.json());
app.use(cookieParser());

server.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port ${process.env.PORT || 3000}`);
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
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
