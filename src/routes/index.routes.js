import { Router } from "express"
import publishRouter from "./posts.routes.js";

const router = Router();

router.use(publishRouter);

export default router;