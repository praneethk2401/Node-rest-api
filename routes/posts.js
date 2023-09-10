import express from 'express';  // Importing express
import Post from '../models/Post.js';  // Importing Post model
import User from '../models/User.js';  // Importing User model

const router = express.Router();  // Creating a new router

// Route for creating a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);  // Creating a new post with the request body
  try {
    const savedPost = await newPost.save();  // Saving the post
    res.status(200).json(savedPost);  // Responding with the saved post
  } catch (err) {
    res.status(500).json(err);  // Responding with error if any
  }
});

// Route for updating a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);  // Finding the post with the provided id
    if (post.userId === req.body.userId) {  // Checking if the user is the owner of the post
      await post.updateOne({ $set: req.body });  // Updating the post
      res.status(200).json("the post has been updated");  // Responding with success message
    } else {
      res.status(403).json("you can update only your post");  // Responding with error if the user is not the owner
    }
  } catch (err) {
    res.status(500).json(err);  // Responding with error if any
  }
});

// Route for deleting a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);  // Finding the post with the provided id
    if (post.userId === req.body.userId) {  // Checking if the user is the owner of the post
      await post.deleteOne();  // Deleting the post
      res.status(200).json("the post has been deleted");  // Responding with success message
    } else {
      res.status(403).json("you can delete only your post");  // Responding with error if the user is not the owner
    }
  } catch (err) {
    res.status(500).json(err);  // Responding with error if any
  }
});

// Route for liking/disliking a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);  // Finding the post with the provided id
    if (!post.likes.includes(req.body.userId)) {  // Checking if the user has not already liked the post
      await post.updateOne({ $push: { likes: req.body.userId } });  // Adding the user to the likes
      res.status(200).json("The post has been liked");  // Responding with success message
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });  // Removing the user from the likes
      res.status(200).json("The post has been disliked");  // Responding with success message
    }
  } catch (err) {
    res.status(500).json(err);  // Responding with error if any
  }
});

// Route for getting a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);  // Finding the post with the provided id
    res.status(200).json(post);  // Responding with the post
  } catch (err) {
    res.status(500).json(err);  // Responding with error if any
  }
});

// Route for getting timeline posts
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);  // Finding the current user
    const userPosts = await Post.find({ userId: currentUser._id });  // Finding the posts of the current user
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });  // Finding the posts of the friends
      })
    );
    res.json(userPosts.concat(...friendPosts))  // Responding with the posts of the current user and his friends
  } catch (err) {
    res.status(500).json(err);  // Responding with error if any
  }
});

export default router;  // Exporting the router
