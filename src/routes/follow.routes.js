import { Router } from "express";
import { follow, unfollow, usersfollower } from "../controllers/follow.controller.js";

const followRouter = Router()

followRouter.post("/follow", follow)
followRouter.delete("/unfollow/:followerId/:followingId", unfollow)
followRouter.get("/usersfollower/:followerId/:followingId", usersfollower)

export default followRouter