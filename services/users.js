import { query } from '../config/db.js';
import mysql from 'mysql';

const User = function (user) {
  if (user) {
    this.Username = user.Username;
    this.Password = user.Password;
    this.EmployeeType = user.EmployeeType;
    this.Name = user.Name;
    this.DOB = user.DOB;
    this.Address = user.Address;
    this.PhoneNumber = user.PhoneNumber;
    this.Username = user.Username;
    this.Password = user.Password;
    this.EmployeeType = user.EmployeeType;
    this.Name = user.Name;
    this.DOB = user.DOB;
    this.Address = user.Address;
    this.PhoneNumber = user.PhoneNumber;
  }
};

User.getAll = async function () {
  const rows = await query('select * from user', null);
  return rows;
};

User.prototype.getUserByUsername = async function () {
  const sql = `
  select * from user
  where user.Username = ? `;
  const rows = await query(sql, this.Username);
  return rows[0];
};

User.prototype.updateUser = async function () {
  const sql = `
  UPDATE user
  SET Password = ?,
      EmployeeType = ?,
      Name = ?,
      DOB = ?,
      Address = ?,
      PhoneNumber = ?
  WHERE user.Username = ?
  `;
  const values = [
    this.Password,
    this.EmployeeType,
    this.Name,
    this.DOB,
    this.Address,
    this.PhoneNumber,
    this.Username,
  ];
  const rows = await query(sql, values);
  return rows;
};

User.prototype.createUser = async function () {
  const sql = `
  INSERT INTO user
  VALUES (?,?,?,?,?,?,?)`;
  const values = [
    this.Username,
    this.Password,
    this.EmployeeType,
    this.Name,
    this.DOB,
    this.Address,
    this.PhoneNumber,
  ];

  const rows = await query(sql, values);
  return rows;
};

export { User };
