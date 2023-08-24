import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkEmail, newUser } from "../repositories/auth.repository.js";

export async function signup(req, res) {
  const { name, email, photo } = req.body;
  console.log("req ok");
  try {
    const user = await checkEmail(email);
    if (user.rows.length > 0)
      return res.status(409).send("E-mail de usuário ja cadastrado!");

    const passwordHashed = bcrypt.hashSync(req.body.password, 10);
    delete req.body.password;
    await newUser(name, email, passwordHashed, photo);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await checkEmail(email);
    if (user.rows.length === 0)
      return res.status(401).send("Usuário e/ou senha incorretos!");

    const correctPassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!correctPassword)
      return res.status(401).send("Usuário e/ou senha incorretos!");

    const dados = { userId: user.rows[0].id };
    const chaveSecreta =
      process.env.JWT_SECRET || "RAJuIUEUG8O7uPUNc0XKfjUjg8kSF3HkLwn";

    const token = jwt.sign(dados, chaveSecreta, { expiresIn: "12h" });

    res
      .status(200)
      .send({
        token,
        id: user.rows[0].id,
        name: user.rows[0].name,
        photo: user.rows[0].photo,
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
}

export async function getUsers(req, res) {
  const { name, id } = req.params;

  try {
    const users = await db.query(
      `
      SELECT u.id, u.name, u.photo,
      CASE WHEN f."followingId" IS NOT NULL THEN true ELSE false END AS isfollowing
      FROM users u
      LEFT JOIN followers f ON u.id = f."followingId" AND f."followerId" = $1
      WHERE u.name ILIKE $2
      ORDER BY isfollowing DESC, u.name;`,
      [id, `%${name}%`]
    );
    if (users.rows.length === 0)
      return res.status(404).send("Nenhum usuario encontrado");

    res.status(200).send(users.rows);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(401);
  }
}

export async function getUsersProfile(req, res) {
  const { id } = req.params;

  try {
    const promise = await db.query(
      `SELECT id, name, photo FROM users WHERE  id = $1;`,
      [id]
    );
    if (promise.rows.length === 0)
      return res.status(404).send("Nenhum usuario encontrado");

    const user = promise.rows[0];
    res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(401);
  }
}
