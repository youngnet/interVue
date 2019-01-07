var router = require('koa-router')();

//用户列表
router.post('/getList',async (ctx, next) =>{
	let sess = ctx.sess();
	console.log(sess,"======sess")
	let obj = ctx.request.body;
	let res = await ctx.post('/admin/users/getList',{...obj})
	ctx.body =res;
});
//提现记录
router.post('/withdrawRecord',async (ctx, next) =>{
	let obj = ctx.request.body;
	let res = await ctx.post('/admin/users/withdrawRecord',{...obj,userId:2})
	ctx.body =res;
});
//审核提现
router.post('/approveWithdraw',async (ctx, next) =>{
	let obj = ctx.request.body;
	let res = await ctx.post('/admin/users/approveWithdraw',{...obj,userId:2})
	ctx.body =res;
});
//课程记录
router.post('/courseRecord',async (ctx, next) =>{
	let obj = ctx.request.body;
	let res = await ctx.post('/admin/users/courseRecord',{...obj,userId:2})
	ctx.body =res;
});




export default router;
