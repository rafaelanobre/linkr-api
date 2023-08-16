import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import express from "express";

const app = express();
app.use(cors());

const { Pool } = pg;

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
};

//if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

export const db = new Pool(configDatabase);