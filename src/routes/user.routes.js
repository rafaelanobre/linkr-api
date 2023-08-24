import { Router } from "express";
import { getUserById } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/userPosts/:userId", getUserById);

export default userRouter;

