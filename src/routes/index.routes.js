import { Router } from "express"
import publishRouter from "./posts.routes.js";
import likeRouter from "./likes.routes.js";
import authrouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";
import userRouter from "./user.routes.js";
import hashtagsRouter from "./hashtags.routes.js";
import followRouter from "./follow.routes.js";

const router = Router();

router.use(publishRouter);
router.use(likeRouter)
router.use(authrouter);
router.use(postsRouter);
router.use(userRouter);
router.use(hashtagsRouter);
router.use(followRouter)

export default router;