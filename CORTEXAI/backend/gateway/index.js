import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  console.log("Hello from gateway");
  res.send("Hello from gateway");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});