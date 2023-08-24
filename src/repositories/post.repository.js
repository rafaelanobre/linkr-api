import { db } from "../database/database.connection.js";

export function createPostDB(createdby, createdat, url, description) {
    return db.query(
        `INSERT INTO posts ("createdBy", "createdAt", url, description) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;`,
        [createdby, createdat, url, description]
    )
}

export async function insertLike(body, res) {
  const { userliked, postId } = body;
  try {
    const checkLike = await db.query(
      `SELECT * FROM likes WHERE userliked = $1 AND "postId" = $2`,
      [userliked, postId]
    );
    if (checkLike.rows.length !== 0)
      return res.status(400).send(checkLike.rows);

    const insertLike = await db.query(
      `INSERT INTO likes ("createdAt", userliked, "postId") VALUES (CURRENT_TIMESTAMP, $1, $2)`,
      [userliked, postId]
    );
    return res.sendStatus(201);
  } catch (err) {}
}

// export async function usersLiked(id) {
//   const Liked = await db.query(
//     `SELECT likes.userliked FROM likes WHERE "postId" = $1`,
//     [id]
//   );
//   return Liked;
// }

export async function usersLiked() {
  const Liked = await db.query(`SELECT * FROM likes`);
  return Liked;
}

export async function deleteLike(userliked, postId) {
  try {
    const result = await db.query(
      `DELETE FROM likes WHERE userliked = $1 AND "postId" = $2`,
      [userliked, postId]
    );

    return result.rowCount; // Retorna o número de linhas afetadas pela exclusão
  } catch (error) {
    throw new Error(error.message);
  }
}


export function getPostByUserIdDB(id) {
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
  LIMIT 20
       
      `,
      [id]
  )
}
