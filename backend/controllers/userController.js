import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    username,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    throw new Error("username does not exist");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});
