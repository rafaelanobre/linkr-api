import { Router } from "express";
import { publishPostForTimeline } from "../controllers/posts.controller.js";
import { getPostsForTimeline } from "../controllers/posts.controller.js";

const postsRouter = Router();

postsRouter.get("/posts", getPostsForTimeline);
postsRouter.post("/posts", publishPostForTimeline);
postsRouter.delete("/posts", );
postsRouter.put("/posts", );

export default postsRouter;