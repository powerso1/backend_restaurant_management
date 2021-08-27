import express from 'express';
import * as orderController from '../controllers/orders.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await orderController.getOrder();
    var test = {}
    test.list = new Array();

    for (var i = 0; i < result.length; i++)
    {
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
    const result = await orderController.postOrder(req.body);
    var IdOrder = { IdOrder : result };
    res.json({ data: IdOrder });
  } catch (error) {
    next(error);
  }
});

// router.patch('/:idfood', async (req, res, next) => {
//   try {
//     const result = await orderController.patchFoodByIdFood(
//       req.params.idfood,
//       req.body
//     );
//     res.json({ data: result });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete('/:idfood', async (req, res, next) => {
//   try {
//     const result = await orderController.deleteFoodByIdFood(req.params.idfood);
//     res.json({ data: result });
//   } catch (error) {
//     next(error);
//   }
// });

export { router };
