import { Coupon as couponService } from '../services/coupons.js';

export async function getCoupon() {
  const rows = await couponService.getAll();
  return rows;
}