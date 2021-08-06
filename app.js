import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;

// Import routes
import { router as usersRoute } from './routes/users.js';

// middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/users', usersRoute);

app.get('/', (req, res) => res.send('Back end is runing bois'));

app.listen(process.env.PORT || port, () =>
  console.log('Example app listening on port %s!', port)
);
