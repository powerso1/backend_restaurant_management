import { query } from '../config/db.js';
import { hashPassword } from '../lib/index.js';
const User = function (user) {
  if (user !== undefined) {
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

User.getProfile = async function () {
  const sql = `
  select Username, EmployeeType, Name, DOB, Address, PhoneNumber, ImageLink, Password
  from user
  `;
  const rows = await query(sql, null);
  return rows;
};

User.prototype.getUserByUsername = async function () {
  const sql = `
  select * from user
  where user.Username = ?`;
  const rows = await query(sql, [this.Username]);

  console.log(rows);

  if (rows.length === 0) {
    const error = new Error();
    error.message = `Cannot find user has username: ${this.Username}`;
    error.status = 404;
    throw error;
  }

  return rows[0];
};

User.prototype.deleteUserByUsername = async function () {
  const sql = `
  DELETE from user
  where user.Username = ?`;
  const rows = await query(sql, [this.Username]);
  return rows;
};

User.prototype.updateUserProfile = async function () {
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
