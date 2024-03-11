// const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF

MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'word-card'
}
module.exports = {
  MYSQL_CONF,
}