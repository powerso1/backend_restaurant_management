import { User as userService } from '../services/users.js';

export async function getUser() {
  const rows = await userService.getAll();
  return JSON.parse(JSON.stringify(rows));
}

export async function postUser(user) {
  const userObj = new userService(user);
  // return await userObj.createUser();

  const rows = await userObj.createUser();
  return JSON.parse(JSON.stringify(rows));
}
export function deleteUserByUsername(username) {}

export async function getUserByUsername(username) {
  const userObj = new userService({ Username: username });
  const rows = await userObj.getUserByUsername();
  return JSON.parse(JSON.stringify(rows));
}

export async function patchUserByUsername(user) {
  const userObj = new userService(user);
  const rows = await userObj.updateUser();
  return JSON.parse(JSON.stringify(rows));
}
