const mysql = require('mysql');
const MYSQL_CONFIG = require('../config/mysql_config');

console.log(MYSQL_CONFIG)
// mysql
const pool = mysql.createPool(MYSQL_CONFIG);
console.log(pool)
// sql语句入口
let query = function(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          resolve(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })
  }

module.exports = {
    query
}