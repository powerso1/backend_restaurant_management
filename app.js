const express = require("express");
const app = express();
const mysql = require("mysql");

const port = 3000;

app.get("/", (req, res) => res.send("Back end is runing bois"));
app.get("/user/:username", (req, res) => {
  console.log("it working");
  res.send({ username: req.params.username, password: "admin" });
  console.log("finish");
});

let connecttion = mysql.createConnection({
  host: "us-cdbr-east-04.cleardb.com",
  user: "bc16d12ee7c8eb",
  password: "a8e818c7",
});

connecttion.connect(function (err) {
  if (err) throw err;
  console.log("DB connected!");
});

// mysql.connect(
//   "mysql://:@/heroku_bafd04ba4f49282?reconnect=true",
//   () => console.log("connected DB")
// );

app.listen(process.env.PORT || port, () =>
  console.log("Example app listening on port %s!", port)
);
