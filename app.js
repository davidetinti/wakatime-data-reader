var express = require("express");

var Router = require("./routes");

var app = express();

app.use(express.json());
app.use("/public", express.static("public"));

app.use("/", Router);

module.exports = app;
