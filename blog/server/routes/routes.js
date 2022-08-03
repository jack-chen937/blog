const express = require("express");
const router = express.Router();
const sqlite3=require("sqlite3")
var db = new sqlite3.Database("./blog.sqlite3");
router.get("/test", (req, res) => {
    sqlStr = "SELECT * FROM admin ";
    db.all(sqlStr, function (err, rows) {
      console.log("11111");
      console.log(rows);
    });
    console.log("44444");
  });

module.exports = router;
