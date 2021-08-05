import { mysqlPool as sql } from '../config/db.js';

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
  sql.query('select * from user', (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('==================');
    console.log(rows);
    return rows;
  });
};

export default User;
