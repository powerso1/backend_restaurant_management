import express from 'express';
import morgan from 'morgan';
import { hashPassword } from './lib/index.js';
import { auth } from './verifyToken.js';

const app = express();
const port = 3000;

// Import routes
import { router as usersRoute } from './routes/users.js';
import { router as foodsRoute } from './routes/foods.js';
import { router as orderItemsRoute } from './routes/order-items.js';
import { router as ordersRoute } from './routes/orders.js';

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
app.get('/temp', (req, res) => res.json({ Price: 12.25 }));

// Routes middleware
app.all('*', auth);

app.use('/users', usersRoute);
app.use('/foods', foodsRoute);
app.use('/order-items', orderItemsRoute);
app.use('/orders', ordersRoute);

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
