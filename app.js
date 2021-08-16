import express from 'express';
import morgan from 'morgan';
import { hashPassword } from './lib/index.js';

const app = express();
const port = 3000;

// Import routes
import { router as usersRoute } from './routes/users.js';
import { router as foodsRoute } from './routes/foods.js';

// ----Middleware----
app.use(morgan('dev'));
app.use(express.json());

// CORS error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.get('/', (req, res) => res.send('Back end is runing bois'));

// Routes middleware
app.use('/users', usersRoute);
app.use('/foods', foodsRoute);

// Error 404 middleware
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// send error middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(process.env.PORT || port, () =>
  console.log('Example app listening on port %s!', port)
);
