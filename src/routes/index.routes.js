import { Router } from "express"
import publishRouter from "./posts.routes.js";
import likeRouter from "./likes.routes.js";
import authrouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";
import usersRouter from "./users.routes.js";

const router = Router();

router.use(publishRouter);
router.use(likeRouter)
router.use(authrouter);
router.use(postsRouter);
router.use(usersRouter);

export default router;