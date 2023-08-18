import { Router } from "express";
import { postsByHashtag, trendingHashtags } from "../controllers/hashtag.controller.js";

const hashtagsRouter = Router()

hashtagsRouter.get("/trending", trendingHashtags);
hashtagsRouter.get("/hashtag/:id", postsByHashtag);

export default hashtagsRouter