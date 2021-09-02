import { query } from '../config/db.js';
import mysql from 'mysql';

const Order = function (order) {
  if (order !== undefined) {
    this.IdOrder = order.IdOrder;
    this.Table = order.Table;
    this.Coupon = order.Coupon;
    this.TotalPrice = order.TotalPrice;
    this.Status = order.Status;
  }
};

Order.prototype.getOrderByIdOrder = async function () {
  const sql = `
  select * from .order
  where IdOrder = ?`;
  const rows = await query(sql, [this.IdOrder]);

  if (rows.length === 0) {
    const error = new Error();
    error.message = `Cannot find order has IdOrder: ${this.IdOrder}`;
    error.status = 404;
    throw error;
  }

  return rows[0];
};

Order.prototype.deleteOrderByIdOrder = async function () {
  const sql = `
  DELETE from .order
  where IdOrder = ?`;
  const rows = await query(sql, [this.IdOrder]);
  return rows;
};

Order.prototype.updateOrder = async function () {
  const sql = `
  UPDATE .order AS o
  SET
    Coupon = ?,
    TotalPrice = ?,
    Status = ?, 
    o.Table = ?
  WHERE IdOrder = ?
  `;
  
  const values = [
    this.Coupon,
    this.TotalPrice,
    this.Status,
    this.Table,
    this.IdOrder,
  ];
  const rows = await query(sql, values);
  return rows;
};

Order.getAllOrders = async function () {
  const sql = `
    SELECT IdOrder
    FROM .order`;
  const rows = await query(sql, null);

  return rows;
};

Order.prototype.createOrder = async function () {
  const sql = `
  SET @@auto_increment_increment=1;
  INSERT INTO .order
  VALUES (?,?,?,?,?)`;
  this.Status = 0;
  this.TotalPrice = 0;
  this.Coupon = 'no sale';
  const values = [
    this.IdOrder,
    this.Table,
    this.Coupon,
    this.TotalPrice,
    this.Status,
  ];
  const rows = await query(sql, values);
  console.log(rows[1]);
  return rows[1];
};

Order.prototype.calcPrice = async function () {
  const sql = `
  SELECT ROUND(SUM(FAD.Price * OI.Number),2) AS Price
  FROM .Order AS O, Order_Item AS OI, food_and_drink AS FAD
  WHERE O.IdOrder = OI.IdOrder AND FAD.IdFood = OI.IdFood AND O.IdOrder = ?`;
  const rows = await query(sql, [this.IdOrder]);
  return rows[0];
};

Order.prototype.calcPriceWithCoupon = async function () {
  const sql = `
  SELECT ROUND((O.TotalPrice * C.DisCount), 2) Price
  FROM .ORDER AS O, COUPON AS C
  WHERE C.IDCOUPON = ? AND O.IDORDER = ?
  `;
  const values = [
      this.Coupon,
      this.IdOrder,
  ];
  const rows = await query(sql, values);
  return rows[0];
};

export { Order };
