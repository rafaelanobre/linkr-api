import { Router } from "express"
import publishRouter from "./posts.routes.js";
import likeRouter from "./likes.routes.js";
import authrouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";
import hashtagsRouter from "./hashtags.routes.js";

const router = Router();

router.use(publishRouter);
router.use(likeRouter)
router.use(authrouter);
router.use(postsRouter);
router.use(hashtagsRouter);

export default router;