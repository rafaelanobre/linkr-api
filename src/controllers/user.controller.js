import { db } from "../database/database.connection.js";

export async function getUserById(req, res) {
    try {
        const userId = req.params.userId;

        const result = await db.query(`
            SELECT users.*, json_agg(posts.*) as posts
            FROM users
            LEFT JOIN posts ON users.id = posts."createdBy"
            WHERE users.id = $1
            GROUP BY users.id
        `, [userId]);


        const userInfo = result.rows[0];

        if (userInfo) {
            res.json(userInfo);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
