const express = require('express');

const router = express.Router()

const db = require('../db/index')

router.post('/warehouse', (req, res) => {
	// console.log(req.body)
	const sql = 'insert into product set ? '
	db.query(sql, {
		title: req.body.title,
		category: req.body.category,
		transport: req.body.transport,
		type:req.body.type,
	}, (err, result) => {
		if (err) {
			return res.send(err)
		}
		// 注册成功
		res.send(result)
	})
})
// 用户登录时间表
router.post('/logindate', (req, res) => {
	// console.log(req.body)
	const sql = 'insert into userslogin set ? '
	db.query(sql, {
		username: req.body.username,
		date: req.body.date,
	}, (err, result) => {
		if (err) {
			return res.send(err)
		}
		// 注册成功
		res.send(result)
	})
})
// 获取仓库列表
router.post('/getwarehouse', (req, res) => {
	// console.log(req.body)
	const sql = 'select * from product'
	db.query(sql, (err, result) => {
		if (err) {
			return res.send(
			{
				status: 1,
				message: '查询失败'
			})
		}
		res.send(result)
	})
})
// 获取用户列表
router.post('/getadmin', (req, res) => {
	const sql = 'select * from userslogin '
	db.query(sql,(err, result) => {
		if (err) {
			return res.send(
			{
				status: 1,
				message: '查询失败'
			})
		}
		res.send(result)
	})
})
// 清空用户列表
router.post('/deleteadmin', (req, res) => {
	const sql = 'delete from userslogin '
	db.query(sql,(err, result) => {
		if (err) {
			return res.send(err)
		}
		res.send(result)
	})
})
// 编辑仓库列表
router.post('/editwarehouse', (req, res) => {
	// console.log(req.body)
	const sql = 'update product set ? where id = ?'
	db.query(sql, [req.body.content, req.body.id] ,(err, result) => {
		if (err) {
			return res.send(
			{
				status: 1,
				message: '更新失败'
			})
		}
		// 注册成功
		res.send("更新成功")
	})
})

// 删除仓库列表
router.post('/movewarehouse', (req, res) => {
	const sql = 'delete from product where id = ?'
	db.query(sql, req.body.id ,(err, result) => {
		if (err) {
			return res.send(
			{
				status: 1,
				message: '删除失败'
			})
		}
		// 注册成功
		res.send("删除成功")
	})
})


module.exports = router
