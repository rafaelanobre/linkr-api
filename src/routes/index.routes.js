import { Router } from "express"
import likeRouter from "./likes.routes.js";
import authrouter from "./auth.routes.js";

const router = Router();
router.use(likeRouter)
router.use(authrouter)

export default router;