import { User as userService } from '../services/users.js';

export async function getUser() {
  const rows = await userService.getAll();
  return rows;
}

export async function postUser(user) {
  const userObj = new userService(user);
  const rows = await userObj.createUser();
  return rows;
}
export async function deleteUserByUsername(username) {
  const userObj = new userService({ Username: username });
  const rows = await userObj.deleteUserByUsername();
  return rows;
}

export async function getUserByUsername(username) {
  const userObj = new userService({ Username: username });
  const rows = await userObj.getUserByUsername();
  return rows;
}

export async function patchUserByUsername(user) {
  const userObj = new userService(user);
  const rows = await userObj.updateUser();
  return rows;
}
