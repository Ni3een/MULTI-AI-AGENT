import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import cookieParser from "cookie-parser";
import getCurrentUser from "./controllers/user.controller";
import { proxyWithHeader } from "./utils/proxyWithheader";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}))
app.use(cookieParser());
app.use("/api/auth",proxy((process.env.AUTH_SERVICE_URL)))
app.use("/api/chat",protect,proxyWithHeader(process.env.CHAT_SERVICE))
app.get("/api/me",protect,getCurrentUser)

app.get("/", (req, res) => {
  console.log("Hello from gateway");
  res.send("Hello from gateway");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});