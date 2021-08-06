import express from 'express';
import * as userController from '../controllers/users.js';
import mysql from 'mysql';
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await userController.getUser();
  res.json(result);
});

router.post('/', async (req, res) => {
  try {
    const result = await userController.postUser(req.body);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.get('/:username', async (req, res) => {
  const result = await userController.getUserByUsername(req.params.username);
  res.json(result);
});

router.patch('/:username', async (req, res) => {
  const result = await userController.patchUserByUsername(req.body);
  res.json(result);
});

export { router };
