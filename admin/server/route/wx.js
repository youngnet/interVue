var router = require('koa-router')();

//所有数量
router.post('/test',async (ctx, next) =>{

	let res = await ctx.get('/test')
	ctx.body =res;
	//ctx.body = {res:"hello world"};
	
});



export default router;
