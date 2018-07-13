const Koa = require('koa')

const app = new Koa()

app.use(async ctx=>{
    ctx.body = '<h1>hello koa</h1>';
})

app.listen(3000, ()=> {
    console.log('[server] starting at prot 3000')
})
