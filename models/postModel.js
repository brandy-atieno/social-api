import mongoose from "mongoose";
const userSchema =  new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
   description: {
    type: String,
    max: 700,
  },
  image: {
    type: String,
  },
   likes: {
    type: Array,
    default: [],
  },
 
}, 
{timestamps:true});
const Post=mongoose.model("posts",userSchema)
export default Post;