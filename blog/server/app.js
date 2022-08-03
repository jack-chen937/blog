/** multer
 * sqlite3
 * uuid
 */

const express = require('express')
const multer = require('multer')
const app = express()
const port = 8080

// 跨域请求
app.use(function (req,res,next){
    // 设置允许域名跨域
    res.header("Access-Control-Allow-Origin","*")
    // 设置Header可以跨域
    res.header("Access-Control-Allow-Headers","*")
    // 设置跨域允许的方法
    res.header("Access-Control-Allow-Methods"," DELETE,PUT,GET,POST,OPTIONS")
    if(req.method === "OPTIONS") res.sendStatus(200)
    else next()
})
// 中间件
app.use(express.json())
// 上传数据
const update=multer({
    dest:"./public/upload/tmp"
})
// 注册路由
app.use("/test",require("./routes/routes"))
app.use("/login",require("./routes/AdminRouter"))

// 允许所有接口都能上传
app.use(update.any())




app.get("/",(req,res)=>{
    res.send('hello')
})

app.listen(port,()=>{
    console.log("启动成功！");
})