import User from '../services/users.js';

export async function getUser() {
  const rows = await User.getAll();
  return JSON.parse(JSON.stringify(rows));
}

export function postUser() {}
export async function getUserByUsername(username) {}
export function patchUserByUsername(username) {}
export function deleteUserByUsername(username) {}
