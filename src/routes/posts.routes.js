import { Router } from "express";
import { publishPostForTimeline } from "../controllers/posts.controller.js";

const publishRouter = Router();

publishRouter.post("/post", publishPostForTimeline);

export default publishRouter;