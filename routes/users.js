import express from 'express';
import * as userController from '../controllers/users.js';
const router = express.Router();

router.get('/', (req, res) => {
  result = userController.getUser();
  res.send(result);
});

router.post('/', (req, res) => {
  res.send('Welcome');
});

router.get('/:username', (req, res) => {
  const username = req.params.username;
  res.send('hello ' + username);
});

export { router };
