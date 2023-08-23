import { Router } from "express"
import { dellike, getlike, postlike } from "../controllers/likes.controller.js"

const likeRouter = Router()

likeRouter.post("/like", postlike)
likeRouter.get("/postliked/:id", getlike)
likeRouter.delete("/deslike/:userliked/:postId", dellike)

export default likeRouter