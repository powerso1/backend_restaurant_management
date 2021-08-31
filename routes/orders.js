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
    if (req.body.OrderItems.length === 0) {
      throw new Error('Order is empty');
    }

    // create order
    const result = await orderController.postOrder(req.body);

    res.json({ data: result });
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
    order['order_items'] = order_items;
    res.json({ data: order });
  } catch (error) {
    next(error);
  }
});

router.patch('/:idorder', async (req, res, next) => {
  try {
    const result = await orderController.patchOrderByIdOrder(
      req.params.idorder,
      req.body
    );
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.delete('/:idorder', async (req, res, next) => {
  try {
    const result = await orderController.deleteOrderByIdOrder(
      req.params.idorder
    );
    res.json({
      data: result,
      message: `Delete successfully order with idorder: ${req.params.idorder}`,
    });
  } catch (error) {
    next(error);
  }
});

export { router };
