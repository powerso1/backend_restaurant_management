import express from 'express';
import * as couponController from '../controllers/coupons.js';
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const result = await couponController.getCoupon();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

export { router };
