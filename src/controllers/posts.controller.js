import { createPostDB } from "../repositories/post.repository.js";

export async function publishPostForTimeline(req, res) {
    const { url, description } = req.body;
    const createdby = res.locals.userId;
    const createdat = new Date();

    try {
        const post = await createPostDB( createdby, createdat, url, description); 
        
        res.status(200).send(post.rows[0]);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
}
