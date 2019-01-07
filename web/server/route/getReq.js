const Router = require('koa-router');
const router = new Router();
const path = require('path');
const sendFile = require('koa-sendfile');
const filePath = path.join(__dirname, '../../dist');

router.get('/login', async (ctx, next) => {
	let { openid, t = '' } = ctx.request.query;
	console.log("​t", t)
	if (ctx.ticket) {
		await ctx.redirect('/mine');
		return;
	}
	if (openid) {
		await sendFile(ctx, `${filePath}/index.html`);
		return;
	}
	let state = { returnURL: `/login`, scope: 'snsapi_userinfo', t };
	ctx.redirect(`/weixin/oauth?state=${JSON.stringify(state)}`);
});

// 获取图形验证码
router.get('/getPicCode', async (ctx, next) => {
	let { phone } = ctx.request.query;
	ctx.type = 'image/png';
	ctx.body = await ctx.post('/captcha/get', { phone }, { responseType: 'stream' });
});

router.get('/logout', async (ctx, next) => {
	ctx.clearSess();
	ctx.redirect('/login');
});

module.exports = router;
