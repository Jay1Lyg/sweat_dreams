const router = require('koa-router')()
const utilmysql= require('../utils/sql')
const createTables = require('../config/createTabel')
router.get('/', async (ctx, next) => {
  // console.log(ctx.session.username)
  // createTable(createTables.role)
// createTable(createTables.permission)
// createTable(createTables.userRole)
// createTable(createTables.rolePermission)
 
ctx.body = await utilmysql.findUser(1);
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
