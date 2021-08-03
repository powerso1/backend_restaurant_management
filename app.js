const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();

const port = 3000;

// Import routes
const usersRoute = require('./routes/users');

// middleware
app.use(express.json());

// Routes
app.use('/users', usersRoute);

app.get('/', (req, res) => res.send('Back end is runing bois'));
app.get('/user/:username', (req, res) => {
  console.log('it working');
  res.send({ username: req.params.username, password: 'admin' });
  console.log('finish');
});

// Database
let connecttion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connecttion.connect(function (err) {
  if (err) throw err;
  console.log('DB connected!');
});

// mysql.connect(
//   "mysql://:@/heroku_bafd04ba4f49282?reconnect=true",
//   () => console.log("connected DB")
// );

app.listen(process.env.PORT || port, () =>
  console.log('Example app listening on port %s!', port)
);
