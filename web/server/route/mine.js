const Router = require('koa-router');
const router = new Router();

router.post('/userinfo', async (ctx, next) => {
	let res = await ctx.post('/account/login', { phone: 13300000001, code: 123456 });
	ctx.body = { cd: 0, data: 1 };
});

// 我的余额
router.post('/myMoney', async (ctx, next) => {
	let user = await ctx.sess();
	let res = await ctx.post('/financial/myAvailable', { userId: user.data.id });
	ctx.body = res;
});

// 提现
router.post('/withdraw', async (ctx, next) => {
	let user = await ctx.sess();
	let { amount } = ctx.request.body;
	let res = await ctx.post('/financial/applyWithdraw', { userId: user.data.id, amount });
	ctx.body = res;
});

// 交易明细
router.post('/dealDetail', async (ctx, next) => {
	let user = await ctx.sess();
	let { page = 1, pagesize = 10, status } = ctx.request.body;
	let res = await ctx.post('/financial/myAccountJournal', { userId: user.data.id, page, pagesize, status });
	ctx.body = res;
});

// 短信验证码
router.post('/sendCode', async (ctx, next) => {
	let { phone, type } = ctx.request.body;
	let res = await ctx.post('/account/sendCode', { phone, type });
	ctx.body = res;
});

// 获取图形验证码
router.post('getCaptcha', async (ctx, next) => {
	let { phone } = ctx.request.body;
	let res = await ctx.post('/captcha/get', { phone });
	ctx.body = res;
});

// 校验图形验证码
router.post('captchaCheck', async (ctx, next) => {
	let { phone } = ctx.request.body;
	let res = await ctx.post('/captcha/validate', { phone });
	ctx.body = res;
});

module.exports = router;
