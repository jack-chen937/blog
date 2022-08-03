// 连接数据库
const sqlite3 = require("sqlite3").verbose();
const { resolve } = require("path");
const path = require("path");
const GenId = require("../utils/fakeid");

var db = new sqlite3.Database("blog.sqlite3");
// 获取外部设定的机器码
const genid = new GenId({ WorkerId: 1 });

// promise 异步处理变同步
db.async = {};
db.async.all = (sql, params) => {
  console.log(sql, params);
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, row) => {
      resolve({ err, row });
      console.log("调用了all方法");
    });
  });
};

db.async.run = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err, row) => {
      resolve({ err, row });
      console.log("调用了run方法");
    });
  });
};
module.exports = { db, genid };
