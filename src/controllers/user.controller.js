import { db } from "../database/database.connection.js";

export async function getUserById(req, res) {
    try {
        const userId = req.params.userId; 
        const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]); 
    
    if (user.rowCount === 0) {
        return res.status(404).send({ message: 'User not found' }); 
    }

        res.status(200).send(user.rows[0]); 
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' }); 
    }
}
