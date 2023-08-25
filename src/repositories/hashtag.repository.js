import { db } from "../database/database.connection.js";

export async function getTrendingHashtags(){
    return db.query(`
    SELECT * FROM hashtags ORDER BY total DESC LIMIT 10
`)
}

export async function getPostsByHashtags(id){
    return db.query(`
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
}

export async function selectExistingHashtag(hashtag){
    return db.query(`
        SELECT * FROM hashtags WHERE hashtag = $1;
    `, [hashtag]);
}

export async function topHashtagTotal(id){
    db.query(`
        UPDATE hashtags SET total = total + 1 WHERE id = $1;
    `, [id]);
}

export async function createNewHashtag(hashtag){
    db.query(`
        INSERT INTO hashtags (hashtag, total) VALUES ($1, 1);
    `, [hashtag]);
}

export async function linkPostAndHashtag(postId, hashtagId){
    db.query(`
        INSERT INTO "postsHashtags" ("postId", "hashtagId") VALUES ($1, $2);
    `, [postId, hashtagId]);
}

export async function deleteLinkPostAndHashtag(postId, hashtagId){
    db.query(`
        DELETE FROM "postsHashtags"
        WHERE "postId" = $1 AND "hashtagId" = $2;
    `, [postId, hashtagId]);
}

export async function downHashtagTotal(id){
    db.query(`
        UPDATE hashtags
        SET total = total - 1
        WHERE id = $1;
    `, [id]);
}