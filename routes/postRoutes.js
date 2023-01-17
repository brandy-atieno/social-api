import express from "express";
import {uploadPost,deletePost,updatePost,getPost,likePost} from "../controllers/postControllers.js";
const postRouter = express.Router();

postRouter.get("/get/:id",getPost);
postRouter.post("/new/post", uploadPost);
postRouter.put("/update/:id",updatePost);
postRouter.delete("/delete/:id",deletePost);
postRouter.put("/like/:id",likePost);








export default postRouter;
