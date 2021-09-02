import { query } from '../config/db.js';
import mysql from 'mysql';

const Coupon = function (coupon) {
  if (coupon !== undefined) {
    this.IdCoupon = coupon.IdCoupon;
    this.Discount = coupon.Discount;
  }
};

Coupon.getAll = async function () {
  const rows = await query('select * from coupon', null);

  return rows;
};


export { Coupon };
