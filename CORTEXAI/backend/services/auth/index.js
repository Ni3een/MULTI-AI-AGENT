import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json())
app.get("/", (req, res) => {
  console.log("Hello from auth service");
  res.send("Hello from auth service");
});

connectDb();

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});