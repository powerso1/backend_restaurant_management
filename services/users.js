import { mysqlPool as sql } from '../config/db.js';

const User = function (user) {
  this.Username = user.Username;
  this.Password = user.Password;
  this.EmployeeType = user.EmployeeType;
  this.Name = user.Name;
  this.DOB = user.DOB;
  this.Address = user.Address;
  this.PhoneNumber = user.PhoneNumber;
};

User.getAll = (result) => {
  sql.query('select * from user', (err, rows) => {
    if (err) {
      console.log(err);
      result(null, err);
      return;
    }
    console.log(rows);
    result(null, rows);
  });
};

export { User };
