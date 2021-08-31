import { Order as orderService } from '../services/orders.js';
import { OrderItems as orderItemService } from '../services/order-items.js';

export async function getOrder() {
  const rows = await orderService.getAllOrders();
  return rows;
}

export async function postOrder(order) {
  const orderObj = new orderService(order);
  const rows = await orderObj.createOrder();
  return rows.insertId;
}

export async function getOrderByIdOrder(idorder) {
  const orderObj = new orderService({ IdOrder: idorder });
  const rows = await orderObj.getOrderByIdOrder();
  return rows;
}

export async function deleteOrderByIdOrder(idorder) {
  const orderObj = new orderService({ IdOrder: idorder });
  const orderitemObj = new orderItemService( {IdOrder: idorder});
  const delItem = await orderitemObj.deleteOrderItemByIdOrder();
  const rows = await orderObj.deleteOrderByIdOrder();
  return rows;
}

export async function patchOrderByIdOrder(idorder, order) {
  const curOrder = await getOrderByIdOrder(idorder);
  const keys = Object.keys(order);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    curOrder[k] = order[k];
  }

  const orderObj = new orderService(curOrder);
  const result = await orderObj.updateOrder();
  return result;
}
