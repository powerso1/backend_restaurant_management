import User from '../services/users.js';

export async function getUser() {
  const temp = await User.getAll();
  await console.log('jshdj', temp);
}

export function postUser() {}
export function getUserByUsername(username) {}
export function patchUserByUsername(username) {}
export function deleteUserByUsername(username) {}
