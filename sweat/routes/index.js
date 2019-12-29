const router = require('koa-router')()
const mysqlconfig = require('../utils/query')

router.get('/', async (ctx, next) => {
  // console.log(ctx.session.username)
  ctx.body = await mysqlconfig.query();
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
