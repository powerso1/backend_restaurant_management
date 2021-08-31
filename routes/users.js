import express from 'express';
import * as userController from '../controllers/users.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await userController.getUser();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await userController.postUser(req.body);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.get('/:username', async (req, res, next) => {
  try {
    const result = await userController.getUserByUsername(req.params.username);
    delete result.Password;
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.patch('/:username', async (req, res, next) => {
  try {
    const result = await userController.patchUserByUsername(
      req.params.username,
      req.body
    );
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.delete('/:username', async (req, res, next) => {
  try {
    const result = await userController.deleteUserByUsername(
      req.params.username
    );
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.patch('/:username/change-password', async (req, res, next) => {
  try {
    const result = await userController.changePassword(
      req.params.username,
      req.body
    );
    res.json({ data: result, message: 'Password change successfully' });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res
      .header({ 'Auth-Token': result.token })
      .json({ data: { EmployeeType: result.EmployeeType } });
  } catch (error) {
    next(error);
  }
});

export { router };
