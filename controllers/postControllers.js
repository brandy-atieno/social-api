import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

// upload post
export const uploadPost = async (req, res) => {
  const postData = req.body;
  const post = await new postModel(postData);

  try {
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//update post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await postModel.findById(id);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ message: "Updated" });
    } else {
      res.status(401).json({ message: "Only update your account" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
//delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await postModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json({ message: "Post Deleted" });
    } else {
      res.status(401).json({ message: "Only delete your account" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
//like post
export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await postModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ message: "Liked" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ message: "Disliked" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get post
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    res.status(200).json({ message: post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//timeline posts
export const getTimelinePosts = async (req, res) => {
  const { userId } = req.body;
  try {
    const currentUser = await userModel.findById(userId);
    const userPosts = await postModel.find({ userId: currentUser._id });
    const followingPosts = await Promise.all(
      currentUser.following.map(followedId => {
       return postModel.find({ userId: followedId });
      })
    )
    res.status(200).json(userPosts.concat(...followingPosts));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
