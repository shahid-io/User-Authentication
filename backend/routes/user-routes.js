import express from "express";
const router = express.Router();
import { authUser } from "../controllers/user-controllers.js";

router.use("/auth", authUser);

export default router;
