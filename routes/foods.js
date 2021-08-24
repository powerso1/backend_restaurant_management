import express from 'express';
import * as foodController from '../controllers/foods.js';
import mysql from 'mysql';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await foodController.getFood();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await foodController.postFood(req.body);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.patch('/:idfood', async (req, res, next) => {
  try {
    const result = await foodController.patchFoodByIdFood(
      req.params.idfood,
      req.body
    );
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.delete('/:idfood', async (req, res, next) => {
  try {
    const result = await foodController.deleteFoodByIdFood(req.params.idfood);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

export { router };
