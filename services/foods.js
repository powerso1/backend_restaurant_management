import { query } from '../config/db.js';
import mysql from 'mysql';

const FoodAndDrink = function (food) {
  if (food) {
    this.IdFood = food.IdFood;
    this.FoodName = food.FoodName;
    this.Price = food.Price;
    this.Description = food.Description;
    this.ImageLink = food.ImageLink;
  }
};

FoodAndDrink.getAll = async function () {
  const rows = await query('select * from food_and_drink', null);
  return rows;
};

User.prototype.deleteFoodByIdFood = async function () {
  const sql = `
  DELETE from food_and_drink
  where food_and_drink.IdFood = ? `;
  const rows = await query(sql, this.IdFood);
  return rows[0];
};

User.prototype.updateFood = async function () {
  const sql = `
  UPDATE food_and_drink
  SET FoodName = ?,
      Price = ?,
      Description = ?,
      ImageLink = ?
  WHERE food_and_drink.IdFood = ?
  `;
  const values = [
    this.IdFood,
    this.FoodName,
    this.Price,
    this.Description,
    this.ImageLink,
  ];
  const rows = await query(sql, values);
  return rows;
};

User.prototype.createFood = async function () {
  const sql = `
  INSERT INTO food_and_drink
  VALUES (?,?,?,?,?)`;
  const values = [
    this.IdFood,
    this.FoodName,
    this.Price,
    this.Description,
    this.ImageLink,
  ];

  const rows = await query(sql, values);
  return rows;
};

export { FoodAndDrink };
