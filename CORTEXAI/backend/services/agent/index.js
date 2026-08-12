import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/agent.route.js"
dotenv.config(); 

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json())
app.use("/",router)
app.get("/", (req, res) => {
  res.send("Hello from agent service");
});


app.listen(PORT, () => {
  console.log(`Agent service is running on port ${PORT}`);
  connectDb();

});