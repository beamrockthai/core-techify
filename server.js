const express = require("express");
const app = express();

app.post("/posts", express.json(), (req, res, next) => {
  console.log(req.body);
  res.send("post da post Love Thatchanon");
});

app.listen(8080, () => {
  console.log("this is port 8080");
});
