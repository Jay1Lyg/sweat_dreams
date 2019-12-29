const mysql = require('mysql');
const MYSQL_CONFIG = require('../config/mysql_config');

console.log(MYSQL_CONFIG)
// mysql
const pool = mysql.createPool(MYSQL_CONFIG);
console.log(pool)
// sql语句入口
const query = (sql,val) => {
    return new Promise((res,rej) => {
        pool.getConnection(function(err,connection){  
            if(err) {
                console.log('连接失败')
                rej(err)
            }  
            else{
                console.log('连接成功')
                connection.query(sql,val,(err,fields) => {
                    if(err) {
                        rej(err)
                    }else{
                        res(fields)
                    }
                    connection.release()
                })
            }
             
        })
         
    })
};

module.exports = {
    query
}