import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";

const commentsRouter = Router();

commentsRouter.get("/comments/:id", );
commentsRouter.post("/comments/:id", validateAuth, );

export default commentsRouter;