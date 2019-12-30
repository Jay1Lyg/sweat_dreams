const querySql = require('./query')

let createTable = function(sql) {
  return querySql.query(sql, [])
}

// 建表
// createTable(createTables.users)
// createTable(createTables.role)
// createTable(createTables.permission)
// createTable(createTables.userRole)
// createTable(createTables.rolePermission)
//
/**
 * 
 * 创建数据
 * INSERT INTO user_info (user_id, user_name, user_pwd, user_head, user_mobile, user_email, user_creatdata, user_login_time, user_count) VALUES ('1122','li','123456','www.baidu.com','18627262626','123@qq.com', NOW(),NOW(),'33');
 */

// 
//注册
async function registerUser(phone, password) {
    let sql = `insert into user_info (elm_userPhone,elm_userPassword) values ('${phone}','${password}')`
    return allSqlAction.allSqlAction(sql).then(res => {
    if (res.affectedRows == 1) {
    return { msg: "注册成功", code: 200 }
    } else {
    return { msg: "注册失败", code: 200 }
    }
    })
} 

// 查询用户是否存在
let findUser = async function(id) {
  let _sql = `
        SELECT * FROM user_info where user_id="${id}" limit 1;
    `
  let result = await querySql.query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}
// 查询用户以及用户角色
let findUserAndRole = async function(id) {
  let _sql = `
      SELECT u.*,r.role_name FROM user_info u,user_role ur,role_info r where u.id=(SELECT id FROM user_info where user_id="${id}" limit 1) and ur.user_id=u.id and r.id=ur.user_id limit 1;
    `
  let result = await querySql.query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}

// 更新用户登录次数和登录时间
let UpdataUserInfo = async function(value) {
  let _sql =
    'UPDATE user_info SET user_count = ?, user_login_time = ? WHERE id = ?;'
  return querySql.query(_sql, value)
}

module.exports = {
  //暴露方法
  createTable,
  findUser,
  findUserAndRole,
  UpdataUserInfo,
//   getShopAndAccount
}