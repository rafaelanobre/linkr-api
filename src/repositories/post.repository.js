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
      return res.status(400).send("usuario ja curtil");

    const insertLike = await db.query(
      `INSERT INTO likes ("createdAt", userliked, "postId") VALUES (CURRENT_TIMESTAMP, $1, $2)`,
      [userliked, postId]
    );
    return res.sendStatus(201);
  } catch (err) {}
}

export async function usersLiked(id) {
  console.log(id);
  const Liked = await db.query(
    `SELECT likes.userliked FROM likes WHERE "postId" = $1`,
    [id]
  );
  return Liked;
}

export async function deleteLike(body) {
  const { userliked, postId } = body;
  const dellike = await db.query(
    `DELETE FROM likes WHERE userliked = $1 AND "postId" = $2`,
    [userliked, postId]
  );
}
