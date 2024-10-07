import { config as configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import connectDb from "./db.js";
import routes from "./Routes/routerRoutes.js";
const port = process.env.PORT || 3000;
const app = express();
configDotenv();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  connectDb(process.env.MONGO_URL);
  console.log(`Server is running`);
});
