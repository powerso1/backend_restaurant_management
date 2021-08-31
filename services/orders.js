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

// User.getProfile = async function () {
//   const sql = `
//   select Username, EmployeeType, Name, DOB, Address, PhoneNumber, ImageLink, Password
//   from user
//   `;
//   const rows = await query(sql, null);
//   return rows;
// };

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

// User.prototype.deleteUserByUsername = async function () {
//   const sql = `
//   DELETE from user
//   where user.Username = ?`;
//   const rows = await query(sql, [this.Username]);
//   return rows;
// };

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
  return rows[1];
};

export { Order };
