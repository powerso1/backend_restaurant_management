import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// Import routes
import { router as usersRoute } from './routes/users.js';

// middleware
app.use(express.json());

// Database
let mysqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

mysqlPool.getConnection(function (err) {
  if (err) throw err;
  console.log('DB connected!');
});

// Routes
app.use('/users', usersRoute);

app.get('/', (req, res) => res.send('Back end is runing bois'));
app.get('/user/:username', (req, res) => {
  console.log('it working');
  res.send({ username: req.params.username, password: 'admin' });
  console.log('finish');
});

// mysql.connect(
//   "mysql://:@/heroku_bafd04ba4f49282?reconnect=true",
//   () => console.log("connected DB")
// );

app.listen(process.env.PORT || port, () =>
  console.log('Example app listening on port %s!', port)
);
