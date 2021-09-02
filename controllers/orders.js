import { Order as orderService } from '../services/orders.js';
import { OrderItems as orderItemService } from '../services/order-items.js';

export async function getOrder() {
  const rows = await orderService.getAllOrders();
  return rows;
}

export async function postOrder(body) {
  const orderObj = new orderService(body);
  const addOrder = await orderObj.createOrder();

  const idorder = addOrder.insertId;

  const orderItemObj = new orderItemService({
    IdOrder: idorder,
    OrderItems: body.OrderItems,
  });
  const addItems = await orderItemObj.createOrderItems();

  return { idorder, addOrder, addItems };
}

export async function getOrderByIdOrder(idorder) {
  const orderObj = new orderService({ IdOrder: idorder });
  const rows = await orderObj.getOrderByIdOrder();
  return rows;
}

export async function deleteOrderByIdOrder(idorder) {
  const orderObj = new orderService({ IdOrder: idorder });
  const orderitemObj = new orderItemService({ IdOrder: idorder });
  const delItems = await orderitemObj.deleteOrderItemByIdOrder();
  const delOrders = await orderObj.deleteOrderByIdOrder();
  return { delItems, delOrders };
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

export async function calcPrice(idorder) {
  const orderObj = new orderService({ IdOrder: idorder});
  const rows = await orderObj.calcPrice();
  return rows.Price;
}

export async function calcPriceWithCoupon(idorder, idcoupon) {

  const orderObj = new orderService({ 
      IdOrder: idorder,
      Coupon: idcoupon,
    });
  // console.log(orderObj);

  const rows = await orderObj.calcPriceWithCoupon();
  return rows.Price;
}