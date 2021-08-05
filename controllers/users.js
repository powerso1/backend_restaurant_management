import { User as userService } from '../services/users.js';

export function getUser() {
  return userService.getAll()[1];
}
export function postUser() {}
export function getUserByUsername(username) {}
export function patchUserByUsername(username) {}
export function deleteUserByUsername(username) {}
