import { db } from "../database/database.connection.js";

export function createPostDB(createdby, createdat, url, description) {
    return db.query(
        `INSERT INTO posts (createdby, createdat, url, description) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;`,
        [createdby, createdat, url, description]
    )
}

