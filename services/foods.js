import { query } from '../config/db.js';
import mysql from 'mysql';
import { v4 as uuidv4 } from 'uuid';

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

FoodAndDrink.prototype.deleteFoodByIdFood = async function () {
  const sql = `
  DELETE from food_and_drink
  where food_and_drink.IdFood = ? `;
  const rows = await query(sql, this.IdFood);
  return rows[0];
};

FoodAndDrink.prototype.updateFood = async function () {
  const sql = `
  UPDATE food_and_drink
  SET FoodName = ?,
      Price = ?,
      Description = ?,
      ImageLink = ?
  WHERE IdFood = ?
  `;
  const values = [
    this.FoodName,
    this.Price,
    this.Description,
    this.ImageLink,
    this.IdFood,
  ];
  const rows = await query(sql, values);
  return rows;
};

FoodAndDrink.prototype.createFood = async function () {
  const sql = `
  INSERT INTO food_and_drink
  VALUES (?,?,?,?,?)`;
  this.IdFood = uuidv4();
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

FoodAndDrink.prototype.getFoodByIdFood = async function () {
  const sql = `
  select * from food_and_drink
  where food_and_drink.IdFood = ? `;
  const rows = await query(sql, this.IdFood);
  return rows[0];
};

export { FoodAndDrink };
