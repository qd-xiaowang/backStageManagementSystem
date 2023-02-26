// 验证模块
const joi = require('joi')

// 用户名的校验规则
// 值必须是字符串，值只能是包含 a-zA-Z0-9 的字符串最小是1最大是10必填项
const username = joi.string().alphanum().min(1).max(10).required()

// 密码校验规则
const password = joi.string().pattern(/^[\w]{6,12}$/).required()

// 注册和登录表单的验证规则对象
exports.login_validation = {
  body: {
    username,
    password
  }
}