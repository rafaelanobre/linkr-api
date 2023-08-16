import { Router } from "express"
import { dellike, getlike, postlike } from "../controllers/post.controller.js"

const likeRouter = Router()

likeRouter.post("/like", postlike)
likeRouter.get("/postliked/:id", getlike)
likeRouter.delete("/delete/like", dellike)

export default likeRouter