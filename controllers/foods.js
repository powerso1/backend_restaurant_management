import { FoodAndDrink as foodService } from '../services/foods.js';

export async function getFood() {
  const rows = await foodService.getAll();
  return rows;
}

export async function postFood(food) {
  const foodObj = new foodService(food);
  const rows = await foodObj.createFood();
  return rows;
}
export async function deleteFoodByIdFood(idfood) {
  const foodObj = new foodService({ IdFood: idfood });
  const rows = await foodObj.deleteFoodByIdFood();
  return rows;
}

export async function patchFoodByIdFood(idfood) {
  const foodObj = new foodService(idfood);
  const rows = await foodObj.updateFood();
  return rows;
}
