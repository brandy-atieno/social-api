import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
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
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userId, password,isAdmin } = req.body;
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
      res.status(200).json({ message: "Updated" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: "Only update your account" });
  }
};
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { userId, password ,isAmin} = req.body;
    if (userId === id || isAdmin) {
        
      try {
        const user = await userModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted" });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    } else {
      res.status(401).json({ message: "Only update your account" });
    }
};
