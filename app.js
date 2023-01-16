import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";


//app
const app = express();
const port = process.env.PORT || 6000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", true);

//db-connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running http://localhost:${port}`);
    });
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use('/auth',authRoute);
app.use('/user',userRoute);


