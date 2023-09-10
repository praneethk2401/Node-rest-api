import { Router } from 'express';  // Importing Router from express
import User from '../models/User.js';  // Importing User model
import bcrypt from 'bcrypt';  // Importing bcrypt for password hashing

const router = Router();  // Creating a new router

// Register route
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);  // Generating salt for password hashing
    const hashedPassword = await bcrypt.hash(req.body.password, salt);  // Hashing the password

    const newUser = new User({  // Creating a new user
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();  // Saving the new user
    res.status(200).json(user);  // Responding with the saved user
  } catch (err) {
    res.status(500).json(err);  // Responding with error if any
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });  // Finding the user with the provided email
    !user && res.status(404).json('user not found');  // If user not found, respond with error

    const validPassword = await bcrypt.compare(req.body.password, user.password);  // Comparing the provided password with the stored password
    !validPassword && res.status(400).json('wrong password');  // If password doesn't match, respond with error

    res.status(200).json(user);  // If everything is fine, respond with the user
  } catch (err) {
    res.status(500).json(err);  // Responding with error if any
  }
});

export default router;  // Exporting the router
