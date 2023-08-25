import { Router } from "express";
import { follow, unfollow, usersfollower, usersFollowing } from "../controllers/follow.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const followRouter = Router()

followRouter.post("/follow", follow)
followRouter.delete("/unfollow/:followerId/:followingId", unfollow)
followRouter.get("/usersfollower/:followerId/:followingId", usersfollower)
followRouter.get("/following", validateAuth, usersFollowing)

export default followRouter