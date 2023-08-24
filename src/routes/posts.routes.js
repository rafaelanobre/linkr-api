import { Router } from "express";
import { DeletePost, editPost, getPostUserById, getPostsForTimeline, publishPostForTimeline } from "../controllers/posts.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import postSchema from "../schemas/post.schema.js";

const postsRouter = Router();

postsRouter.get("/posts", getPostsForTimeline);
postsRouter.post("/posts", validateAuth, validateSchema(postSchema), publishPostForTimeline);
postsRouter.patch("/posts/:id", validateAuth, editPost);
postsRouter.get("/user/:id", getPostUserById);
postsRouter.delete("/delete-post/:postId",validateAuth, DeletePost)

export default postsRouter;