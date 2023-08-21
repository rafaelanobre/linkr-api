import { db } from "../database/database.connection.js";
import { createPostDB } from "../repositories/post.repository.js";
import { getMetadata } from "../services/posts.services.js";

export async function publishPostForTimeline(req, res) {
    const { url, description } = req.body;
    const createdBy = res.locals.userId;
    console.log('createdBy: ', createdBy);
    const createdAt = new Date();
    
    try {
        const post = await createPostDB(createdBy, createdAt, url, description); 
        
        res.status(200).send(post.rows[0]);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
}

export async function getPostsForTimeline(req, res) {
    try {
        const { rows: posts } = await db.query(`
        SELECT 
        p.id AS "postId",
        p.url,
        p.description,
        u.name AS "userName",
        u.photo AS "userPhoto",
        u.id AS "userId",
        ARRAY_AGG(users.name) AS "usersLikedNames"
        FROM 
            posts p
        LEFT JOIN 
            users u ON p."createdBy" = u.id
        LEFT JOIN 
            likes l ON l."postId" = p.id
        LEFT JOIN 
            users ON l.userliked = users.id
        GROUP BY 
            p.id, u.id
        ORDER BY 
            p."createdAt" DESC
        LIMIT 20;
        `);

        if (posts.rowCount === 0) return res.status(204).send({message:'There are no posts yet'});

        const postsWithMetadata = await Promise.all(posts.map(async (post) => {
            const metadata = post.url ? await getMetadata(post.url) : {};
            return {
                ...post,
                metadata,
            };
        }));

        res.status(200).send(postsWithMetadata);
    }catch(error){
        const errorMessage = error.message ? error.message : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}
