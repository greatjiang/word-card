const router = require('koa-router')()

const { getWord, addWord } = require('../controller/word.js')

router.get('/list', async (ctx, next) => {
  const result = await getWord()
  console.log(result)

  ctx.body = { data: result }
})


router.post('/addWord', async (ctx, next) => {
  // console.log(ctx.request.body)
  const result = addWord(ctx.request.body)

  return result.then(listData => {
    // console.log(listData)
    // 设置响应的 Content-Type 为 application/json
    ctx.type = 'application/json';
    // 设置响应的状态码为 200，并将 JSON 数据作为响应的主体
    ctx.status = 200;
    ctx.body = {
      code: 1
    };
  }).catch(err => {
    // new ResultModel({
    //   data: {},
    //   message: err,
    //   code: -1
    // })
  })
})



module.exports = router
