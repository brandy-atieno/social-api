import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 6000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Social Media API");
});
app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
