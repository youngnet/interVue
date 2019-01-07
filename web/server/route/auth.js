const Router = require('koa-router');
const router = new Router();

// 修改手机号
router.post('/changePhone', async (ctx, next) => {
	let { phone, newPhone, code } = ctx.request.body;
	let res = await ctx.post('/account/modifyPhone', { phone, newPhone, code });
	ctx.body = res;
});

// 获取短信验证码
router.post('/getCode', async (ctx, next) => {
	let { phone, type } = ctx.request.body;
	let res = await ctx.post('/account/sendCode', { phone, type });
	console.log("​res", res.msg)
	ctx.body = res;
});

// 手机号登录
router.post('/login', async (ctx, next) => {
	let { phone, code } = ctx.request.body;
	let res = await ctx.post('/account/login', { phone, code });
	if (res.cd == 0) {
		ctx.sess(res.data);
		res.data = null;
	}
	ctx.body = res;
});

// 校验weixin登录
router.post('/wxlogin', async (ctx, next) => {
	let { openid } = ctx.request.body;
	let res = await ctx.post('/account/wxlogin', { openid });
	if (res.cd == 0) {
		ctx.sess(res.data);
		res.data = null;
	}
	ctx.body = res;
});

// 注册
router.post('/reg', async (ctx, next) => {
	let { phone, openid, wxhead, wxname, code, qrcode } = ctx.request.body;
	let res = await ctx.post('/account/reg', { phone, openid, wxhead, wxname, code, qrcode });
	if (res.cd == 0) {
		ctx.sess(res.data);
		res.data = null;
	}
	ctx.body = res;
});

// 校验图形验证码
router.post('/validateCode', async (ctx, next) => {
	let { phone, code } = ctx.request.body;
	let res = await ctx.post('/captcha/validate', { phone, code });
	ctx.body = res;
});

router.post('/getUserInfo', async (ctx, next) => {
	let res = await ctx.sess();
	ctx.body = res;
});

// 校验手机号是否注册
router.post('/validatePhone', async (ctx, next) => {
	let { phone } = ctx.request.body;
	let res = await ctx.post('/account/findUserByPhone', { phone });
	ctx.body = res;
});

// 填写家庭信息
router.post('/addFamily', async (ctx, next) => {
	let { ...info } = ctx.request.body;
	let sess = await ctx.sess();
	info.userId = sess.data.id;
	let res = await ctx.post(
		'/family/createFamilyInfo',
		{ ...info },
		{ headers: { 'Content-Type': 'application/json' } }
	);
	ctx.body = res;
});

// 获取家庭信息
router.post('/getFamily', async (ctx, next) => {
	let sess = await ctx.sess();
	let res = await ctx.post('/family/getFamilyInfo', { userId: sess.data.id });
	ctx.body = res;
});

router.post('/clearSess', async (ctx, next) => {
	await ctx.clearSess();
	ctx.body = { cd: 0 };
});

module.exports = router;
