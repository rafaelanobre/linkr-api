
import { deleteLike, insertLike, usersLiked } from "../repositories/post.repository.js";


export async function postlike(req, res){
    try {
        await insertLike(req.body, res)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getlike(req, res){
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.sendStatus(400);

    try {
        const likes = await usersLiked(id)
        res.status(201).send(likes.rows)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function dellike(req, res){
    
    try {
        const del = deleteLike(req.body)
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message);
    }
}
