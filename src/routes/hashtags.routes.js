import { Router } from "express";
import { trendingHashtags } from "../controllers/hashtag.controller.js";

const hashtagsRouter = Router()

hashtagsRouter.get("/trending", trendingHashtags);

export default hashtagsRouter