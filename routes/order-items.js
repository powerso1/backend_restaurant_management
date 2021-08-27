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
    const deleteAll = await orderItemController.deleteOrderItemByIdOrder(
      req.params.idorder
    );
    const addAll = await orderItemController.postOrderItem(req.body);
    console.log(deleteAll, addAll);
    const result = { deleteAll: deleteAll, addAll: addAll };
    res.json({ data: result, message: 'Edit order success' });
  } catch (error) {
    next(error);
  }
});

export { router };
