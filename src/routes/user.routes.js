import { Router } from "express";
import { getUserById } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/user/:userId", getUserById);

export default userRouter;

