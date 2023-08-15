import { Router } from "express"
import authrouter from "./auth.routes.js";

const router = Router();

router.use(authrouter)

export default router;