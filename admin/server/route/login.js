var router = require('koa-router')();

//获取验证码
router.get('/getCode',async (ctx, next) =>{
    console.log("aaaaaa")
    var {phone} = ctx.request.body;
    var result = await ctx.post('/captcha/get',{phone,responseType:"stream"});
    
    ctx.body = result;
});
router.post('/adminlogin',async (ctx, next) =>{
    var {name,passwd,img_code,code_key} = ctx.request.body;
    var result = await ctx.post('/admin/login',{name,passwd,img_code,code_key});
    ctx.sess(result.data.ticket);
    ctx.body = result;
});



export default router;
