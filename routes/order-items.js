import express from 'express';
import * as orderItemController from '../controllers/order-items.js';
const router = express.Router();

router.get('/:idorder', async (req, res, next) => {
  try {
    const result = await orderItemController.getOrderItemByIdOrder(
      req.params.idorder
    );
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.put('/:idorder', async (req, res, next) => {
  try {
    await orderItemController.deleteOrderItemByIdOrder(req.params.idorder);
    await orderItemController.postOrderItem(req.body);
    res.json({ data: { message: 'Edit order success' } });
  } catch (error) {
    next(error);
  }
});

export { router };
