import { User as userService } from '../services/users.js';
import { hashPassword } from '../lib/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

export async function patchUserByUsername(username, user) {
  const curUser = await getUserByUsername(username);

  const keys = Object.keys(user);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    curUser[k] = user[k];
  }

  const userObj = new userService(curUser);
  const result = await userObj.updateUserProfile();
  return result;
}

export async function changePassword(username, body) {
  const curUser = await getUserByUsername(username);
  const curPassword = curUser.Password;
  const validPass = await bcrypt.compare(body.OldPassword, curPassword);

  if (!validPass) {
    const error = new Error();
    error.status = 400;
    error.message = 'Your old password is incorrect';
    throw error;
  }

  const newPassword = await hashPassword(body.NewPassword);
  const userObj = new userService({
    Username: body.Username,
    Password: newPassword,
  });
  await userObj.updateUserPassword();
  return { message: 'Password change successfully' };
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

  // create token
  const token = jwt.sign(
    {
      Username: result.Username,
      EmployeeType: result.EmployeeType,
    },
    process.env.SECRET_TOKEN
  );

  return { token: token, EmployeeType: result.EmployeeType };
}
