const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Back end is runing bois"));
app.get("/user/:username", (req, res) => {
  console.log("it working");
  res.send({ username: req.params.username, password: "admin" });
  console.log("finish");
});

app.listen(process.env.PORT || port, () =>
  console.log("Example app listening on port %s!", port)
);
