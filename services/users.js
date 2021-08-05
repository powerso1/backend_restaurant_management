import { query } from '../config/db.js';

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

export default User;
