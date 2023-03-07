const express = require("express");

const app = express();

app.get("/check", (req, res) => {
  res.jsonp({ message: "haha" });
});

module.exports = app;
