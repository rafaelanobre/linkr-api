import { db } from "../database/database.connection.js";

export async function postComments(req,res){
    const {id} = req.params;
    try{
        const { rows: comments} = await db.query(`SELECT * FROM comments WHERE "postId"=$1`, [id]);
        if (comments.rowCount === 0) return res.status(204).send({ message: 'There are no comments yet' });
        res.status(200).send(comments);
    }catch(error){
        const errorMessage = error.message ? error.message : 'An internal server error occurred.';
        res.status(500).send(errorMessage);
    }
}

export async function insertNewComment(req,res){
    const {id} = req.params;
    const {comment} = req.body;
    try{
        const { rows: [newComment] } = await db.query(`
            INSERT INTO comments ("postId", "createdBy", comment)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,[id, res.locals.userId, comment])
        res.status(200).send(newComment);
    }catch(error){
        const errorMessage = error.message ? error.message : 'An internal server error occurred.';
        res.status(500).send(errorMessage);
    }
}