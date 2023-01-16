import express from "express";
import { getUser,updateUser,deleteUser,follow,unfollow } from "../controllers/userControllers.js";
const userRouter = express.Router();
userRouter.get("/single_user/:id", getUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.put("/follow/:id", follow);
userRouter.put("/unfollow/:id", unfollow);





export default userRouter;
