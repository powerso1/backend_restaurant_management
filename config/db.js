import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();
// Database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true,
  multipleStatements: true,
});

export const query = function (sql, values) {
  // returns a Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            // reject(err);
            reject(err);
          } else {
            resolve(rows);
          }
          // end the session
          connection.release();
        });
      }
    });
  });
};
