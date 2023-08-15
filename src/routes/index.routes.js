import { Router } from "express"
import authrouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";

const router = Router();

router.use(authrouter);
router.use(postsRouter);

export default router;