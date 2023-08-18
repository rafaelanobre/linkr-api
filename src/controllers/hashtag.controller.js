import { db } from "../database/database.connection.js";

export async function trendingHashtags(req,res){
    try{
        const { rows: trending} = await db.query(`
            SELECT * FROM hashtags ORDER BY total DESC LIMIT 10
        `)
        res.status(200).send(trending);
    } catch(error){
        const errorMessage = error.message ? error.message : 'An internal server error occurred.';
        res.status(500).send(errorMessage);
    }
}