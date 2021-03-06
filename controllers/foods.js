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

export async function getFoodByIdFood(idfood) {
  const foodObj = new foodService({ IdFood: idfood });
  const rows = await foodObj.getFoodByIdFood();
  return rows;
}

export async function patchFoodByIdFood(idfood, food) {
  const curFood = await getFoodByIdFood(idfood);

  const keys = Object.keys(food);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    curFood[k] = food[k];
  }

  const foodObj = new foodService(curFood);
  const result = await foodObj.updateFood();
  return result;
}
