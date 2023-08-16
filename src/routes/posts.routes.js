import { Router } from "express";
import { getPostsForTimeline } from "../controllers/posts.controller.js";

const postsRouter = Router();

postsRouter.get("/posts", getPostsForTimeline);
postsRouter.post("/posts", );
postsRouter.delete("/posts", );
postsRouter.put("/posts", );

export default postsRouter;