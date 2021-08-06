import express from 'express';
import * as userController from '../controllers/users.js';
import mysql from 'mysql';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await userController.getUser();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await userController.postUser(req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:username', async (req, res) => {
  try {
    const result = await userController.getUserByUsername(req.params.username);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.patch('/:username', async (req, res) => {
  try {
    const result = await userController.patchUserByUsername(req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:username', async (req, res) => {
  try {
    const result = await userController.deleteUserByUsername(
      req.params.username
    );
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

export { router };
