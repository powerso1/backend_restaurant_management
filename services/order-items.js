import { query } from '../config/db.js';

const OrderItems = function (orderItems) {
  if (orderItems) {
    this.IdOrder = orderItems.IdOrder;
    this.list = orderItems.list;
  }
};

OrderItems.prototype.deleteOrderItemByIdOrder = async function () {
  const sql = `
  DELETE from order_item
  where order_item.IdOrder = ? `;
  const rows = await query(sql, [this.IdOrder]);
  return rows;
};

OrderItems.prototype.createOrderItems = async function () {
  const sql = `
  INSERT INTO order_item(IdOrder, IdFood, Number)
  VALUES ?
  `;
  let values = [];
  for (let i = 0; i < this.list.length; i++) {
    values.push([this.IdOrder, this.list[i].IdFood, this.list[i].Number]);
  }

  const rows = await query(sql, [values]);
  return rows;
};

OrderItems.prototype.getOrderItemByIdOrder = async function () {
  const sql = `
  select * from order_item
  where order_item.IdOrder = ? `;

  const rows = await query(sql, [this.IdOrder]);
  return rows;
};

export { OrderItems };
