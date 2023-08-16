
import { db } from "../database/database.connection.js";
import { createPostDB } from "../repositories/post.repository.js";

export async function publishPostForTimeline(req, res) {
    const { url, description } = req.body;
    const createdby = res.locals.userId;
    const createdat = new Date();

    try {
        const post = await createPostDB(createdby, createdat, url, description); 
        
        res.status(200).send(post.rows[0]);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
}

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
