import { getPostsByHashtags, getTrendingHashtags } from "../repositories/hashtag.repository.js";
import { insertMetadataIntoPosts } from "../services/posts.services.js";

export async function trendingHashtags(req,res){
    try{
        const { rows: trending} = await getTrendingHashtags();
        res.status(200).send(trending);
    } catch(error){
        const errorMessage = error.message ? error.message : 'An internal server error occurred.';
        res.status(500).send(errorMessage);
    }
}

export async function postsByHashtag(req,res){
    const {id} = req.params;
    try{
        const { rows: posts } = await db.query(`
        SELECT 
            p.id AS "postId",
            p.url,
            p.description,
            u.name AS "userName",
            u.photo AS "userPhoto",
            u.id AS "userId",
            ARRAY_AGG(users.name) AS "usersLikedNames",
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
            likes l ON l."postId" = p.id
        LEFT JOIN 
            users ON l.userliked = users.id
        LEFT JOIN
            "postsHashtags" ph ON p.id = ph."postId"
        LEFT JOIN
            hashtags h ON ph."hashtagId" = h.id
        WHERE
            h.id = $1
        GROUP BY
            p.id, u.id
        ORDER BY 
            p."createdAt" DESC
        LIMIT 20;
        `, [id])

        if (posts.rowCount === 0) return res.status(204).send({ message: 'There are no posts yet' });

        const postsWithMetadata = await insertMetadataIntoPosts(posts);
        res.status(200).send(postsWithMetadata);
    }catch(error){
        const errorMessage = error.message ? error.message : 'An internal server error occurred.';
        res.status(500).send(errorMessage);
    }
}