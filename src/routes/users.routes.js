import { Router } from "express";
import { getUserById } from "../controllers/user.controller.js";

const usersRouter = Router();

usersRouter.get("/users/:userId", getUserById);

export default usersRouter;