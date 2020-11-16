var express = require("express");
var router = express.Router();
var path = require("path");

/* GET homepage */
router.get("/", function (req, res, next) {
    res.sendFile(path.resolve("views/index.html"));
});

module.exports = router;