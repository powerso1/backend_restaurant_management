import express from 'express';
import * as userController from '../controllers/users.js';
import { mysqlPool as sql } from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('haha');

  function foo(result) {
    sql.query('select * from user', (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(rows);
      result(rows);
    });
  }
  const temp = foo((result) => {
    console.log(result);
  });
});

router.post('/', (req, res) => {
  // const result = userController.getUser();
  // res.send('Welcome');
});

router.get('/:username', (req, res) => {
  const username = req.params.username;
  res.send('hello ' + username);
});

export { router };
