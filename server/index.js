import { config as configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import { connectDb, seedData } from "./db.js";
const app = express();
configDotenv();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});
// seedData();
app.listen(port, () => {
  connectDb(process.env.MONGO_URL);
  console.log(`Server is running`);
});
