const express = require('express')

const app = express()

const config = require('./config/index')
// 解析token
const expressJWT = require('express-jwt')
// cors跨域
const cors = require('cors')
// 全局挂载
app.use(cors())


// 解析表单数据的中间件
// 防止req.body等于undefined
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 用户注册登录模块
const Router = require('./Router/index')
// 用户管理模块
const infoRouter = require('./infoRouter/index')

const warehouseRouter = require('./warehouseRouter/index')
// 全局挂载
app.use('/api',Router)
// 全局挂载
app.use('/my', infoRouter)
app.use('/w',warehouseRouter)


// 除了api不需要token认证之外其他都要
// app.use(expressJWT({ secret: config.jwtSecretkey }).unless({ path: [/^\/api\//] }))

const joi = require('joi')
// 错误中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.send('用户密码规则出错')
  // 未知错误
  res.send(err)

  // 身份认证失败
  // if (err.name === 'UnauthorizedError') return res.send('身份验证失败')
})

app.listen(3007, () => {
  console.log('http://127.0.0.1:3007');
})