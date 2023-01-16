import mongoose from "mongoose";
const userSchema =  new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max:20,
    unique:true
  },
  email: {
    type: String,
    required: true,
    max:50,
    unique:true
  },
  password: {
    type: String,
    required: true,
    min:6
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    max:50

  },
  city: {
    type: String,
    max:50
  },
  from: {
    type: String,
    maxLength:50

  },
  relationship: {
    type: String,
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
 
}, 
{timestamps:true});
const User=mongoose.model("users",userSchema)
export default User;