/**
 * 数据库
 * 
 */

const mysql = require('mysql')

// 创建数据库连接
const db = mysql.createPool({
  host: 'localhost',
  user: 'admin123',
  password: 'admin123',
  database: 'my_db_01'
})

// 向外导出
module.exports = db