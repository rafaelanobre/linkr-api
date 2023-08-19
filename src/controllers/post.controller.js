import { db } from "../database/database.connection.js";
import { deleteLike, insertLike, usersLiked,} from "../repositories/post.repository.js";

export async function postlike(req, res) {
  try {
    await insertLike(req.body, res);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getlike(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.sendStatus(400);

  try {
    const likes = await usersLiked();
    res.status(201).send(likes.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function dellike(req, res) {
  const { userliked, postId } = req.params;

  try {
    const rowCount = await deleteLike(userliked, postId);

    if (rowCount === 0) {
      return res.status(422).send("Curtida não existe");
    }

    res.status(200).send(rowCount.toString());
  } catch (error) {
    res.status(500).send(error.message);
  }
}
