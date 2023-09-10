import User from "../models/User.js"; // Importing the User model
import express from "express"; // Importing the express library
import bcrypt from "bcrypt"; // Importing the bcrypt library for password hashing

const router = express.Router(); // Creating a new router object

router.put("/:id", async (req, res) => { // Endpoint for updating a user
  if (req.body.userId === req.params.id || req.body.isAdmin) { // Check if the user is the same as the one making the request or if the user is an admin
    if (req.body.password) { // If a new password is provided
      try {
        const salt = await bcrypt.genSalt(10); // Generate a new salt
        req.body.password = await bcrypt.hash(req.body.password, salt); // Hash the new password
      } catch (err) {
        return res.status(500).json(err); // Return any errors that occur during password hashing
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { // Update the user in the database
        $set: req.body,
      });
      res.status(200).json("Account has been updated"); // Send a success response
    } catch (err) {
      return res.status(500).json(err); // Return any errors that occur during user update
    }
  } else {
    return res.status(403).json("You can update only your account!"); // If the user is not the same as the one making the request and is not an admin, deny the request
  }
});

router.delete("/:id", async (req, res) => { // Endpoint for deleting a user
  if (req.body.userId === req.params.id || req.body.isAdmin) { // Check if the user is the same as the one making the request or if the user is an admin
    try {
      await User.findByIdAndDelete(req.params.id); // Delete the user from the database
      res.status(200).json("Account has been deleted"); // Send a success response
    } catch (err) {
      return res.status(500).json(err); // Return any errors that occur during user deletion
    }
  } else {
    return res.status(403).json("You can delete only your account!"); // If the user is not the same as the one making the request and is not an admin, deny the request
  }
});

router.get("/:id", async (req, res) => { // Endpoint for getting a user
  try {
    const user = await User.findById(req.params.id); // Find the user in the database
    const { password, updatedAt, ...other } = user._doc; // Exclude the password and updatedAt fields from the response
    res.status(200).json(other); // Send the user data as a response
  } catch (err) {
    res.status(500).json(err); // Return any errors that occur during user retrieval
  }
});

router.put("/:id/follow", async (req, res) => { // Endpoint for a user to follow another user
  if (req.body.userId !== req.params.id) { // Check if the user is not trying to follow themselves
    try {
      const user = await User.findById(req.params.id); // Find the user to be followed in the database
      const currentUser = await User.findById(req.body.userId); // Find the user making the request in the database
      if (!user.followers.includes(req.body.userId)) { // Check if the user is not already following the other user
        await user.updateOne({ $push: { followers: req.body.userId } }); // Add the user making the request to the other user's followers
        await currentUser.updateOne({ $push: { followings: req.params.id } }); // Add the other user to the user making the request's followings
        res.status(200).json("user has been followed"); // Send a success response
      } else {
        res.status(403).json("you already follow this user"); // If the user is already following the other user, deny the request
      }
    } catch (err) {
      res.status(500).json(err); // Return any errors that occur during the follow process
    }
  } else {
    res.status(403).json("you can't follow yourself"); // If the user is trying to follow themselves, deny the request
  }
});

router.put("/:id/unfollow", async (req, res) => { // Endpoint for a user to unfollow another user
  if (req.body.userId !== req.params.id) { // Check if the user is not trying to unfollow themselves
    try {
      const user = await User.findById(req.params.id); // Find the user to be unfollowed in the database
      const currentUser = await User.findById(req.body.userId); // Find the user making the request in the database
      if (user.followers.includes(req.body.userId)) { // Check if the user is following the other user
        await user.updateOne({ $pull: { followers: req.body.userId } }); // Remove the user making the request from the other user's followers
        await currentUser.updateOne({ $pull: { followings: req.params.id } }); // Remove the other user from the user making the request's followings
        res.status(200).json("user has been unfollowed"); // Send a success response
      } else {
        res.status(403).json("you don't follow this user"); // If the user is not following the other user, deny the request
      }
    } catch (err) {
      res.status(500).json(err); // Return any errors that occur during the unfollow process
    }
  } else {
    res.status(403).json("you can't unfollow yourself"); // If the user is trying to unfollow themselves, deny the request
  }
});

export default router; // Export the router object
