#!/usr/bin/env node

const app = require("../app");
const http = require("http");

const port = "5000";

app.listen(port, function () {
    console.log("Server running on port 5000!");
});
