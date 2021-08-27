import { OrderItems as orderItemService } from '../services/order-items.js';

export async function postOrderItem(body) {
  const orderItemObj = new orderItemService(body);
  const rows = await orderItemObj.createOrderItems();
  return rows;
}

export async function deleteOrderItemByIdOrder(idorder) {
  const orderItemObj = new orderItemService({ IdOrder: idorder });
  const rows = await orderItemObj.deleteOrderItemByIdOrder();
  return rows;
}

export async function getOrderItemByIdOrder(idorder) {
  const orderItemObj = new orderItemService({ IdOrder: idorder });
  const rows = await orderItemObj.getOrderItemByIdOrder();
  return rows;
}
