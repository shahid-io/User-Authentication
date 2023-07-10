import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/user-model.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  console.log(token)
  console.log(req.cookies.jwt);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.userId).select("-password")  ;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
