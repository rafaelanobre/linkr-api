import { Router } from "express"
import likeRouter from "./likes.routes.js";
import authrouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";
import userRouter from "./user.routes.js";
import hashtagsRouter from "./hashtags.routes.js";
<<<<<<< HEAD
import followRouter from "./follow.routes.js";
=======
import commentsRouter from "./comments.routes.js";
>>>>>>> 746f8b1ffdc673c709a8eaafa8e4e5fa9063d6f6

const router = Router();

router.use(likeRouter)
router.use(authrouter);
router.use(postsRouter);
router.use(userRouter);
router.use(hashtagsRouter);
<<<<<<< HEAD
router.use(followRouter)
=======
router.use(commentsRouter);
>>>>>>> 746f8b1ffdc673c709a8eaafa8e4e5fa9063d6f6

export default router;