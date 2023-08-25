import { db } from "../database/database.connection.js";

export async function follow(req, res){
    const {followerId, followingId} = req.body
    
    try {
        const promise = await db.query(`INSERT INTO followers ("followerId", "followingId") VALUES ($1, $2)`, [followerId, followingId])
        res.sendStatus(200)
    } catch(err){
        res.status(500).send(err.message)
    }
}

export async function unfollow(req, res){
    const {followerId, followingId} = req.params
    
    try {
        const promise = await db.query(`DELETE FROM followers WHERE "followerId" = $1 AND "followingId" = $2`, [followerId, followingId])
        res.sendStatus(200)
    } catch(err){
        res.status(500).send(err.message)
    }
}

export async function usersfollower(req, res){
    const {followerId, followingId} = req.params
    try {
        const promise = await db.query(`SELECT * FROM followers WHERE "followerId" = $1 AND "followingId" = $2`, [followerId, followingId])
        res.status(200).send(promise.rows)
    } catch(err){
        res.status(500).send(err.message)
    }
}

export async function usersFollowing(req, res){
    try {
        const { rows: following } = await db.query(`SELECT "followingId" FROM followers WHERE "followerId" = $1`, [res.locals.userId])
        res.status(200).send(following);
    } catch (error) {
        const errorMessage = error.message ? error.message : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}