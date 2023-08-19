import { Router } from "express";
import { DeletePost, getPostUserById, publishPostForTimeline } from "../controllers/posts.controller.js";
import { getPostsForTimeline } from "../controllers/posts.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import postSchema from "../schemas/post.schema.js";
import { validateAuth } from "../middlewares/validateAuth.js";


const postsRouter = Router();

postsRouter.get("/posts", getPostsForTimeline);
postsRouter.post("/posts", validateAuth, validateSchema(postSchema), publishPostForTimeline);
postsRouter.delete("/posts", );
postsRouter.put("/posts", );
postsRouter.get("/user/:id", getPostUserById);
postsRouter.delete("/delete-post/:postId",validateAuth, DeletePost)

export default postsRouter;