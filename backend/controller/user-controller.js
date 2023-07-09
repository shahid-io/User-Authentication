import asyncHandler from "express-async-handler";
import User from "../model/user-model.js";
import generateToken from "../utils/generate-token.js";
/**
 * Auth user/set token
 * route POST api/user/auth
 */

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email/password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.status(200).json({ message: "register user" });
});

const logoutUser = asyncHandler((req, res) => {
  res.status(200).json({ message: "logout user" });
});

const getUserProfile = asyncHandler((req, res) => {
  res.status(200).json({ message: "user profile" });
});

const updateUserProfile = asyncHandler((req, res) => {
  res.status(200).json({ message: "update user profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
