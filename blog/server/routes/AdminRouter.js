const express = require("express");
const router = express.Router();
// const nanoid = require("nanoid");
const { v4: uuidv4 } = require("uuid");
const { db, genid } = require("../db/DbUtils");

router.post("/login", async (req, res) => {
  let { account, password } = req.body;
  let check_sql="select * from admin where account = " +account+" AND password= "+password
  let { err, rows } = await db.async.all(
    check_sql,
    [account, password]
  );
  console.log("-------------------------------");
  console.log(err,rows);
  console.log("-------------------------------");
  if (err == null ) {
    // 生成token
    let login_token = uuidv4();
    let update_token_sql = "UPDATE `admin`  SET `token` = ? where `id`=?";
    await db.async.run(update_token_sql, [login_token, rows[0].id]);

    let admin_info = rows[0];
    admin_info.token = login_token;
    admin_info.password = "";

    res.send({ code: 200, msg: "登录成功", data: admin_info });
  } else {
    res.send({ code: 500, msg: "登录失败" });
  }
});

module.exports = router;
