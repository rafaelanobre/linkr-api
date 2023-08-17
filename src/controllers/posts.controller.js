
import { db } from "../database/database.connection.js";
import { createPostDB } from "../repositories/post.repository.js";
import { getMetadata } from "../services/posts.services.js";

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

export async function getPostsForTimeline(req, res) {
    try {
        const { rows: posts } = await db.query(`
            SELECT 
            p.id AS "postId",
            p.url,
            p.description,
            u.name AS "userName",
            u.photo AS "userPhoto",
            COALESCE(
                json_agg(
                    json_build_object(
                        'hashtagId', h.id,
                        'hashtag', h.hashtag
                    )
                ) FILTER (WHERE h.id IS NOT NULL),
                '[]'
            ) AS hashtags
            FROM 
            posts p
            LEFT JOIN 
            users u ON p."createdBy" = u.id
            LEFT JOIN
            "postsHashtags" ph ON p.id = ph."postId"
            LEFT JOIN
            hashtags h ON ph."hashtagId" = h.id
            GROUP BY
            p.id, u.id
            ORDER BY 
            p."createdAt" DESC
            LIMIT 20;
        `);

        if (posts.length === 0) return res.status(204).send({ message: 'There are no posts yet' });

        const postsWithMetadata = await Promise.all(posts.map(async (post) => {
            const metadata = post.url ? await getMetadata(post.url) : {};
            return {
                ...post,
                metadata
            };
        }));

        res.status(200).send(postsWithMetadata);
    } catch (error) {
        const errorMessage = error.message ? error.message : 'An internal server error occurred.';
        res.status(500).send(errorMessage);
    }
}


