import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();
// Database
export const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
