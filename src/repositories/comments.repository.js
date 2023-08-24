import { db } from "../database/database.connection.js";

export async function getCommentsByPostId(id){
    return db.query(`SELECT * FROM comments WHERE "postId"=$1`, [id]);
}

export async function createNewComment(postId, userId, comment){
    db.query(`
            INSERT INTO comments ("postId", "createdBy", comment)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,[])
}