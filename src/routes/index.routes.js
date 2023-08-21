import { Router } from "express"
import publishRouter from "./posts.routes.js";
import likeRouter from "./likes.routes.js";
import authrouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use(publishRouter);
router.use(likeRouter)
router.use(authrouter);
router.use(postsRouter);
router.use(userRouter);

export default router;