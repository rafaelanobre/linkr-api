import bcrypt from 'bcrypt';
import { checkEmail, newUser } from '../repositories/auth.repository.js';
import { createToken } from "../services/auth.services.js";

export async function signup(req, res) {
    const { name, email, photo  } = req.body
    try {
        const user = await checkEmail(email);
        if (user.rows.length > 0) return res.status(409).send("E-mail de usuário ja cadastrado!");

        const passwordHashed = bcrypt.hashSync(req.body.password, 10);
        delete req.body.password;
        await newUser(name, email, passwordHashed, photo)

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
        if (user.rows.length === 0) return res.status(401).send("Usuário e/ou senha incorretos!");        

        const correctPassword = bcrypt.compareSync(password, user.rows[0].password);
        if (!correctPassword) return res.status(401).send("Usuário e/ou senha incorretos!");

        const dados = { userId: user.rows[0].id };
        const token = createToken(dados);
        res.status(200).send( { token, id: user.rows[0].id, name: user.rows[0].name, photo: user.rows[0].photo});
    }
    catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
}