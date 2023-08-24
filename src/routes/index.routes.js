import { Router } from "express"
import likeRouter from "./likes.routes.js";
import authrouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";
import userRouter from "./user.routes.js";
import hashtagsRouter from "./hashtags.routes.js";
import commentsRouter from "./comments.routes.js";

const router = Router();

router.use(likeRouter)
router.use(authrouter);
router.use(postsRouter);
router.use(userRouter);
router.use(hashtagsRouter);
router.use(commentsRouter);

export default router;