import express from "express";
import { getUser,updateUser,deleteUser } from "../controllers/userControllers.js";
const userRouter = express.Router();
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);


// authRouter.post("/login", login);

export default userRouter;
