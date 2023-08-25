import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { insertNewComment, postComments } from "../controllers/comments.controller.js";

const commentsRouter = Router();

commentsRouter.get("/comments/:id", postComments);
commentsRouter.post("/comments/:id", validateAuth, insertNewComment);

export default commentsRouter;