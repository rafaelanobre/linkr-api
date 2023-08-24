import { db } from "../database/database.connection.js";

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

    return result.rowCount;
  } catch (error) {
    throw new Error(error.message);
  }
}
