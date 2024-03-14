const router = require('koa-router')()

const { getWord, addWord } = require('../controller/word.js')

router.get('/list', async (ctx, next) => {
  const result = await getWord()
  console.log(result)

  ctx.body = {
    code: 1,
    data: result
  }
})


router.post('/addWord', async (ctx, next) => {
  const result = addWord(ctx.request.body)

  return result.then(listData => {
    ctx.body = {
      code: 1
    };
  }).catch(err => {
    ctx.body = {
      code: -1,
      message: '异常错误'
    };
  })
})



module.exports = router
