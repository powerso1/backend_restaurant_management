import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// Import routes
import { router as usersRoute } from './routes/users.js';

// middleware
app.use(express.json());

// Routes
app.use('/users', usersRoute);

app.get('/', (req, res) => res.send('Back end is runing bois'));

// mysql.connect(
//   "mysql://:@/heroku_bafd04ba4f49282?reconnect=true",
//   () => console.log("connected DB")
// );

app.listen(process.env.PORT || port, () =>
  console.log('Example app listening on port %s!', port)
);
