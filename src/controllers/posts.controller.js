import { db } from "../database/database.connection.js";

export async function getPostsForTimeline(req,res){
    try{
        const { rows: posts } = await db.query(`
        SELECT 
            p.id AS "postId",
            p.url,
            p.description,
            u.name AS "userName",
            u.photo AS "userPhoto"
        FROM 
            posts p
        LEFT JOIN 
            users u ON p."createdBy" = u.id
        ORDER BY 
            "createdAt" DESC
        LIMIT 20;
        `);

        if (posts.rowCount === 0) return res.status(204).send({message:'There are no posts yet'});
        res.status(200).send(posts);
    }catch(error){
        const errorMessage = error.message ? error.message : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}