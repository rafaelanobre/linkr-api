import jwt from 'jsonwebtoken';

export function createToken(user) {
    const payload = {
        userId: user.id,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}
=======
import { db } from "../database/database.connection.js";


export async function checkEmail(email){
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}


export async function newUser(name, email, passwordHashed, photo){
    return db.query(`INSERT INTO users ( name, email, password, photo) VALUES
    ($1, $2, $3, $4) RETURNING * `, [name, email, passwordHashed, photo]);
}