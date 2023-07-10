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

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged user" });
});

const getUserProfile = asyncHandler((req, res) => {
  const user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json({ message: "user profile", data: user });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ message: "update user profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
