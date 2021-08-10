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
    this.ImageLink = user.ImageLink;
  }
};

User.getAll = async function () {
  const sql = `
  select Username, EmployeeType, Name, DOB, Address, PhoneNumber, ImageLink
  from user
  `;
  const rows = await query(sql, null);
  return rows;
};

User.prototype.getUserByUsername = async function () {
  const sql = `
  select * from user
  where user.Username = ? `;
  const rows = await query(sql, this.Username);
  return rows[0];
};

User.prototype.deleteUserByUsername = async function () {
  const sql = `
  DELETE from user
  where user.Username = ? `;
  const rows = await query(sql, this.Username);
  return rows[0];
};

User.prototype.updateUser = async function () {
  const sql = `
  UPDATE user
  SET
      EmployeeType = ?,
      Name = ?,
      DOB = ?,
      Address = ?,
      PhoneNumber = ?,
      ImageLink = ?
  WHERE user.Username = ?
  `;
  const values = [
    this.EmployeeType,
    this.Name,
    this.DOB,
    this.Address,
    this.PhoneNumber,
    this.ImageLink,
    this.Username,
  ];
  const rows = await query(sql, values);
  return rows;
};

User.prototype.createUser = async function () {
  const sql = `
  INSERT INTO user
  VALUES (?,?,?,?,?,?,?,?)`;
  const values = [
    this.Username,
    this.Password,
    this.EmployeeType,
    this.Name,
    this.DOB,
    this.Address,
    this.PhoneNumber,
    this.ImageLink,
  ];

  const rows = await query(sql, values);
  return rows;
};

export { User };
