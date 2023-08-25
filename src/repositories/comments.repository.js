import { db } from "../database/database.connection.js";

export async function getCommentsByPostId(id){
    return db.query(`
    SELECT
        c.*,
        u.name AS "userName",
        u.photo AS "userPhoto"
    FROM
        "comments" c
    LEFT JOIN
        "users" u ON c."createdBy" = u."id"
    WHERE
        c."postId" = $1
    ORDER BY
        c."createdAt" ASC;
    `, [id]);
}

export async function createNewComment(postId, userId, comment){
    return db.query(`
            INSERT INTO comments ("postId", "createdBy", comment)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,[postId, userId, comment])
}