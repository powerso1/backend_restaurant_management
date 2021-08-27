import { Order as orderService } from '../services/orders.js';

export async function getOrder() {
  const rows = await orderService.getAllOrders();
  return rows;
}

export async function postOrder(order) {
  const orderObj = new orderService(order);
  const rows = await orderObj.createOrder();
  return rows.insertId;
}

// export async function deleteFoodByIdFood(idfood) {
//   const foodObj = new foodService({ IdFood: idfood });
//   const rows = await foodObj.deleteFoodByIdFood();
//   return rows;
// }

// export async function getFoodByIdFood(idfood) {
//   const foodObj = new foodService({ IdFood: idfood });
//   const rows = await foodObj.getFoodByIdFood();
//   return rows;
// }

// export async function patchFoodByIdFood(idfood, food) {
//   const curFood = await getFoodByIdFood(idfood);

//   const keys = Object.keys(food);
//   for (let i = 0; i < keys.length; i++) {
//     const k = keys[i];
//     curFood[k] = food[k];
//   }

//   const foodObj = new foodService(curFood);
//   const result = await foodObj.updateFood();
//   return result;
// }
