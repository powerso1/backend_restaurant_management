import { query } from '../config/db.js';
import mysql from 'mysql';

const User = function (user) {
  this.Username = user.Username || null;
  this.Password = user.Password;
  this.EmployeeType = user.EmployeeType;
  this.Name = user.Name;
  this.DOB = user.DOB;
  this.Address = user.Address;
  this.PhoneNumber = user.PhoneNumber;
};

User.getAll = async function () {
  const rows = await query('select * from user', null);
  return rows;
};

User.getUserByUsername = async function (username) {
  const rows = await query(
    'select * from user where user.Username = ?',
    username
  );
  return rows[0];
};

export default User;
