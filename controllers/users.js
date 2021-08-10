import { User as userService } from '../services/users.js';
import { hashPassword } from '../lib/index.js';
import bcrypt from 'bcryptjs';

export async function getUser() {
  const userObj = new userService();
  const result = await userService.getProfile();
  return result;
}

export async function postUser(user) {
  user.Password = await hashPassword(user.Password);
  const userObj = new userService(user);
  const result = await userObj.createUser();
  return result;
}
export async function deleteUserByUsername(username) {
  const userObj = new userService({ Username: username });
  const result = await userObj.deleteUserByUsername();
  return result;
}

export async function getUserByUsername(username) {
  const userObj = new userService({ Username: username });
  const result = await userObj.getUserByUsername();
  return result;
}

export async function patchUserByUsername(user) {
  const userObj = new userService(user);
  const result = await userObj.updateUserProfile();
  return result;
}

export async function login(user) {
  const userObj = new userService(user);
  const result = await userObj.getUserByUsername();
  const validPass = await bcrypt.compare(userObj.Password, result.Password);

  if (!validPass) {
    const error = new Error();
    error.status = 400;
    error.message = 'Your username or password is incorrect';
    throw error;
  }

  return validPass;
}
