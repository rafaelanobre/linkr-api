import { Router } from "express"
import likeRouter from "./likes.routes.js";

const router = Router();

router.use(likeRouter)

export default router;