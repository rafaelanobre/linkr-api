import { Router } from "express"
import publishRouter from "./posts.routes.js";
import likeRouter from "./likes.routes.js";
import authrouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";

const router = Router();

router.use(publishRouter);
router.use(likeRouter)
router.use(authrouter);
router.use(postsRouter);

export default router;