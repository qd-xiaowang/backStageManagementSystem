//用户管理模块
const express = require('express')
const { result } = require('lodash')
const { Result } = require('postcss')
const { send } = require('vite')

const router = express.Router()

const db = require('../db/index')

// 获取数据
router.get('/getlist', (req, res) => {
  // 查询状态等于0的数据
  const sql = 'select * from infolist where status=0'
  db.query(sql, (err, result) => {
    if (err) return res.send({status: 1, message: err.message})
    res.send({
      status: 0,
      message: '获取数据成功',
      data: result
    })
  })
})

// 新增
router.post('/addlist', (req, res) => {
  // 往sql里面插入一条数据
  const sql = 'insert into infolist set ? '
  db.query(sql, req.body, (err,result) => {
    if (err) return res.send({status: 1, message: err.message})
    // 新增数据成功
    res.send({status: 0, message: '新增成功'})
  })
})

// 删除
router.get('/delelist/:id', (req, res) => {
  // 把上传id的那条数据的状态码改为1 数据库的数据不能乱删除所有用状态码来表示0等于还在1等于删除
  const sql = 'update infolist set status=1 where id=?'
  // 路径查询/：id使用req.prams
  db.query(sql, req.params.id, (err, result) => {
     if (err) return res.send({status: 1, message: err.message})
     res.send({status: 0, message: '删除成功'})
  })
  
})

// 根据id查询数据
router.get('/query/:id', (req, res) => {
  sql = 'select * from infolist where id=?'
  db.query(sql, req.params.id, (err, result) => {
    if (err) return res.send({status: 1, message: err.message})
    res.send({
      status: 0,
      message: '查询成功',
      data: result
    })
  })
})

// 修改
router.post('/update', (req,res) => {
  // 修改哪一条id的数据和数据内容
  const sql = 'update infolist set ? where id=?'
  db.query(sql, [req.body, req.body.id], (err, result) => {
    if (err) return res.send({status: 1, message: err.message})
    // 修改成功
    res.send({status: 0, message: '修改成功'})
  })
})


module.exports = router