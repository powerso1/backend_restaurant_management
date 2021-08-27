import express from 'express';
import * as orderController from '../controllers/orders.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await orderController.getOrder();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await orderController.postOrder(req.body);
    res.json({ data: { list: result.IdOrder } });
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
