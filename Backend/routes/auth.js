const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const dotenv = require("dotenv");
const authMiddleware = require("../middleware/authMiddleware");
dotenv.config();

const router = express.Router();

//protected route : Only authenticated users should access this.
router.get("/protected", authMiddleware, async (req, res) => {
  try {
    // You can send user-specific data or just a message
    res.json({ message: "This is protected data", user: req.user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// Register user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save(); //calls the pre-save hook to hash the password
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("username: ", username);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password); //comparePassword is a method defined in the user model
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      // Create JWT token
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.json({ token }); // Send token to client ,you can check the token in the browser response dev tools
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
