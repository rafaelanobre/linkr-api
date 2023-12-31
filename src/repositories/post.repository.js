import { db } from "../database/database.connection.js";

export async function createPostDB(createdby, createdat, url, description) {
    return db.query(
        `INSERT INTO posts ("createdBy", "createdAt", url, description) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;`,
        [createdby, createdat, url, description]
    )
}


export async function getPostByUserIdDB(id, limit, offset) {
  return db.query(
      `SELECT 
      p.id AS "postId",
      p.url,
      p.description,
      u.id AS "userId",
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
      WHERE p."createdBy" = $1 
      GROUP BY 
          p.id, u.id
      ORDER BY 
          p."createdAt" DESC
          LIMIT $2
          OFFSET $3;          
      `,
      [id, limit, offset]
  )
}

export async function deletePostDB(createdBy, postId){
  return db.query(
    `DELETE FROM posts WHERE "createdBy" = $1 AND "id" = $2`,
    [createdBy, postId]
  )
}

export async function getTimelinePostsDB(limit, offset,userId){
  return db.query(`
    SELECT 
        p.id AS "postId",
        p.url,
        p.description,
        p.repost,
        u.name AS "userName",
        u.photo AS "userPhoto",
        u.id AS "userId",
        uo.id AS "userOrigemId",
        uo.name AS "userOrigemName",
        uo.photo AS "userOrigemPhoto",
        (SELECT COUNT(*) FROM comments c WHERE c."postId" = p.id) AS "commentCount",
        (SELECT COUNT(*) FROM posts pt WHERE pt."origemPostId" = p.id) AS "repostCountOrigem",
        (SELECT COUNT(*) FROM posts pts WHERE p."origemPostId" = pts."origemPostId") AS "repostCountRepost",
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
    LEFT JOIN 
        users uo ON p."origemCreatedBy" = uo.id
    WHERE 
        p."createdBy" = $3 OR p."createdBy" IN (SELECT "followingId" FROM followers WHERE "followerId" = $3)
    GROUP BY
        p.id, u.id, uo.id
    ORDER BY 
        p."createdAt" DESC
    LIMIT $1
    OFFSET $2;
  `,[limit, offset, userId]);
}

export async function updatePost(description, id){
  return db.query(`
    UPDATE posts AS p
    SET description = $1
    WHERE id = $2
    RETURNING p.*,
    COALESCE(
      (SELECT json_agg(
        json_build_object(
          'hashtagId', h.id,
          'hashtag', h.hashtag
        )
      ) FROM "postsHashtags" AS ph
    LEFT JOIN hashtags AS h ON ph."hashtagId" = h.id
    WHERE ph."postId" = p.id), '[]') AS hashtags;`,
  [description, id]);
}

export async function searchPostById(id){
  return db.query(`SELECT * FROM posts WHERE id = $1`, [id]);
}

export async function searchPostByIdWithHashtags(id){
  return db.query(`
    SELECT p.*,
        COALESCE(
          (SELECT json_agg(
            json_build_object(
              'hashtagId', h.id,
              'hashtag', h.hashtag
            )
          ) FROM "postsHashtags" AS ph
    LEFT JOIN hashtags AS h ON ph."hashtagId" = h.id
    WHERE ph."postId" = p.id), '[]') AS hashtags
    FROM posts AS p
    WHERE p.id = $1;
  `, [id]);
}


export async function createrepostDB(createdby, createdat, url, description, postId, origemCreatedBy) {
  return db.query(
      `INSERT INTO posts ("createdBy", "createdAt", url, description, repost, "origemPostId", "origemCreatedBy") 
          VALUES ($1, $2, $3, $4, $5, $6, $7) 
          RETURNING *;`,
      [createdby, createdat, url, description, true, postId, origemCreatedBy]
  )
}