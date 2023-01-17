import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
// get user
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    const { password, ...otherDetails } = user._doc;
    if (user) {
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userId, password, isAdmin } = req.body;
  if (userId === id || isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    }
    try {
      const user = await userModel.findByIdAndUpdate(id, {
        $set: req.body,
      });
      res.status(200).json({ message: "Updated",data:user });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: "Only update your account" });
  }
};
//delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { userId, isAdmin } = req.body;
  if (userId === id || isAdmin) {
    try {
      const user = await userModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: "Only update your account" });
  }
};
//follow
export const follow = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (userId !== id) {
    try {
      const user = await userModel.findById(id);
      const currentUser = await userModel.findById(userId);
      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { following: id } });
        res.status(200).json({ message: "User being follwed" });
      } else {
        res.status(403).json({ message: "Already following" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Cannot follow yoursel" });
  }
};

//unfollow
export const unfollow = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (userId !== id) {
    try {
      const user = await userModel.findById(id);
      const currentUser = await userModel.findById(userId);
      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { following: id } });
        res.status(200).json({ message: " unfollwed user" });
      } else {
        res.status(403).json({ message: "Already unfollowed user" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Cannot unfollow yourself" });
  }
};
