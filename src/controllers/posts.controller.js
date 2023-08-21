import { AsyncResource } from "async_hooks";
import { db } from "../database/database.connection.js";
import { createPostDB, getPostByUserIdDB } from "../repositories/post.repository.js";
import { getMetadata } from "../services/posts.services.js";

export async function publishPostForTimeline(req, res) {

    const { url, description } = req.body;
    const createdBy = res.locals.userId;
    const createdAt = new Date();

    const hashtagsArray = description.match(/#(\w+)/g) || [];
    const hashtags = hashtagsArray.map(hashtag => hashtag.replace('#', ''));
    const descriptionWithoutHashtags = description.replace(/#(\w+)/g, '').trim();

    try {

        const post = await createPostDB(createdBy, createdAt, url, descriptionWithoutHashtags);

        if (hashtags.length > 0) {
            await Promise.all(hashtags.map(async (tag) => {
                const { rows: [existingTag] } = await db.query(`
                    SELECT * FROM hashtags WHERE hashtag = $1;
                `, [tag]);
                console.log(existingTag)
                if (existingTag !== undefined) {
                    await db.query(`
                    UPDATE hashtags SET total = total + 1 WHERE id = $1;
                    `, [existingTag.id]);
                } else {
                    await db.query(`
                    INSERT INTO hashtags (hashtag, total) VALUES ($1, 1);
                    `, [tag]);
                }

                const { rows: [newTag] } = await db.query(`
                    SELECT * FROM hashtags WHERE hashtag = $1;
                `, [tag]);

                await db.query(`
                    INSERT INTO "postsHashtags" ("postId", "hashtagId") VALUES ($1, $2);
                `, [post.rows[0].id, newTag.id]);
            }));
        }

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
        GROUP BY
            p.id, u.id
        ORDER BY 
            p."createdAt" DESC
        LIMIT 20;
    `);

        if (posts.rowCount === 0) return res.status(204).send({ message: 'There are no posts yet' });

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


export async function getPostUserById(req, res) {

    const id = Number(req.params.id)


    try {
        const { rows: posts } = await getPostByUserIdDB(id);
        if (posts.rowCount === 0) return res.status(204).send({ message: 'There are no posts yet' });

        const postsWithMetadata = await Promise.all(posts.map(async (post) => {
            const metadata = post.url ? await getMetadata(post.url) : {};
            return {
                ...post,
                metadata
            };
        }));

        res.status(200).send(postsWithMetadata);
    } catch (error) {
        const errorMessage = error.message ? error.message : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function DeletePost(req, res) {
    const createdBy = res.locals.userId;
    console.log(createdBy)
    const postId = Number(req.params.postId)
    try {
        const del = await db.query(
            `DELETE FROM posts WHERE "createdBy" = $1 AND "id" = $2`,
            [createdBy, postId]
        )
        if(del.rowCount === 0) return res.status(401).send("you do not have authorization to delete this post")
        res.sendStatus(200);
    } catch (error) {
        const errorMessage = error.message ? error.message : "it was not possible to delete.";
        res.status(500).send(errorMessage);
    }

}