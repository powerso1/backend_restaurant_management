import express from 'express';
import * as userController from '../controllers/users.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await userController.getUser();
  res.json(result);
});

router.post('/', (req, res) => {
  // const result = userController.getUser();
  // res.send('Welcome');
});

router.get('/:username', (req, res) => {
  const username = req.params.username;
  res.send('hello ' + username);
});

export { router };
