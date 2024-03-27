import mysql, { PoolOptions } from 'mysql2/promise';
import { config as dotenvConfig } from 'dotenv';

/** Config to read environment variables */
dotenvConfig({path: '../.env'});

const access: PoolOptions = {
    user: process.env.SEARCH_SERVICE_DB_USER,
    password: process.env.SEARCH_SERVICE_DB_PASSWORD,
    database: process.env.SEARCH_SERVICE_DB_USE
}

export const conn = mysql.createPool(access);