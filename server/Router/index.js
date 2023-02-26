const express = require('express');

const router = express.Router()

const db = require('../db/index')

const jwt = require('jsonwebtoken')

// 导入配置文件
const config = require('../config/index')

// 导入验证表单中间件
const expressjoi = require('@escook/express-joi')

// 导入需要验证的对象
const {
	login_validation
} = require('../validation/index');



// req等于客户端 res等于服务器
// 放入验证表单中间件
router.post('/reguser', (req, res) => {
	const userStr = req.body
	console.log(userStr);
	// 用户或者密码为空
	if (!userStr.username || !userStr.password) {
		return res.send({
			status: 1,
			message: '用户名密码不能为空'
		})
	}
	// 定义查询sql语句
	// 查找数据库里面user表里用户传过来的usename在那里
	const Strsql = 'select * from users where username=?'
	// db.query(sql语句，查询的数据)
	db.query(Strsql, [userStr.username], (err, result) => {
		if (err) {
			return res.send({
				status: 1,
				message: err.message
			})
		}
		// 用户名被占用
		// 查询到的数据条数大于0的话说明查到了一样的用户名
		if (result.length > 0) {
			return res.send({
				status: 1,
				message: '用户名被占用，请更换用户名'
			})
		}
		const sql = 'insert into users set ?'
		db.query(sql, {
			username: userStr.username,
			password: userStr.password,
			// admin:userStr.admin,
		}, (err, result) => {
			if (err) {
				return res.send({
					status: 1,
					message: '注册失败'
				})
			}
			// 注册成功
			res.send({
				status: 0,
				message: '注册成功'
			})
		})
	})
})

// 登录
router.post('/login', expressjoi(login_validation), (req, res) => {
	const loginStr = req.body
	// 定义sql语句
	const sql = `select * from users where username=?`
	db.query(sql, loginStr.username, (err, result) => {
		console.log(result);
		if (err) return res.send({
			status: 1,
			message: err.message
		})
		// 执行语句成功但是查到的数据不等于1代表没查到
		if (result.length !== 1) return res.send({
			status: 1,
			message: '登录失败'
		})
		// 判断返回的密码不等于客户端提交的密码就return出去
		if (result[0].password !== loginStr.password) return res.send({
			status: 1,
			message: '密码错误'
		})
		// const user = {
		// 	...result[0],
		// 	password: '',
		// 	status: ''
		// }
		res.send(result)
	})

})

module.exports = router
