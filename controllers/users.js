import User from '../services/users.js';

export async function getUser() {
  const rows = await User.getAll();
  return JSON.parse(JSON.stringify(rows));
}

export function postUser() {}
export async function getUserByUsername(username) {
  const rows = await User.getUserByUsername(username);
  return JSON.parse(JSON.stringify(rows));
}
export function patchUserByUsername(username) {}
export function deleteUserByUsername(username) {}
