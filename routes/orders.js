import express from 'express';
import * as orderController from '../controllers/orders.js';
import * as orderItemController from '../controllers/order-items.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await orderController.getOrder();
    var test = {};
    test.list = new Array();

    for (var i = 0; i < result.length; i++) {
      test.list.push(result[i].IdOrder);
    }
    test.list = test.list.toString();
    res.json({ data: test });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // create order
    const curIdOrder = await orderController.postOrder(req.body);

    // create order-item
    await orderItemController.postOrderItem({
      IdOrder: curIdOrder,
      OrderItems: req.body.OrderItems,
    });

    var IdOrder = { IdOrder: curIdOrder };
    res.json({ data: IdOrder });
  } catch (error) {
    next(error);
  }
});

router.get('/:idorder', async (req, res, next) => {
  try {
    const order = await orderController.getOrderByIdOrder(req.params.idorder);
    const order_items = await orderItemController.getOrderItemByIdOrder(
      req.params.idorder
    );
    const result = { order, order_items };
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

// router.delete('/:idfood', async (req, res, next) => {
//   try {
//     const result = await orderController.deleteFoodByIdFood(req.params.idfood);
//     res.json({ data: result });
//   } catch (error) {
//     next(error);
//   }
// });

export { router };
