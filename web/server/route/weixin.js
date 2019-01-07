const Router = require('koa-router');
const router = new Router();
const qs = require('qs');
const appid = 'wxfcc4cd33eac49159';
const appsecret = '4c2aeacd748d95e4efcbc96d2fb858f2';
const querystring = require('querystring');


const host = 'webjyl.ngrok.duhuijie.cn';

router.get('/oauth', async (ctx, next) => {
	// let wxConfig = await ctx.post('')
	// 获取用户详细信息使用 snsapi_userinfo
	let { state } = ctx.request.query;
	// console.log(ctx.request.url,"​state", state)
	// state = decodeURIComponent(state);
	state = JSON.parse(state);
	let scope = state.scope || 'snsapi_base';
	state.scope = scope;
	state = querystring.stringify(state);

	let redirect_uri = null;
	if (process.env.NODE_ENV === 'dev') {
		redirect_uri = ctx.protocol + `://${host}/weixin/oauth2`;
	} else {
		redirect_uri = ctx.protocol + `://${ctx.host}/weixin/oauth2`;
	}

	let weixin_url = `https://open.weixin.qq.com/connect/oauth2/authorize?${qs.stringify({
		appid,
		redirect_uri,
		response_type: 'code',
		scope,
		state
	})}#wechat_redirect`;
	ctx.redirect(weixin_url);
});

router.get('/oauth2', async (ctx, next) => {
	var { code, state } = ctx.request.query;

	var { returnURL, scope, ...other } = querystring.parse(state);
	// console.log(querystring.parse(state), '---​state---', state);

	if (code) {
		var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code`;
		var res = await ctx.get(url);

		var { access_token, openid } = res;

		console.log('###openid', openid);
		// 非静默授权用于注册
		if (scope === 'snsapi_userinfo') {
			// 微信登录判断是否存在该用户
			var wxuser = await ctx.get(
				`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
			);
			console.log('​wxuser', wxuser);
			await ctx.redirect(
				`${returnURL}?openid=${openid}&wxname=${encodeURIComponent(
					wxuser.nickname
				)}&wxhead=${wxuser.headimgurl}&${qs.stringify(other)}`
			);
		} else {
			ctx.redirect(`${returnURL}?openid=${openid}&${qs.stringify(other)}`);
		}
	} else {
		ctx.body = 'error: no code ';
	}
});

router.post('/shareConfig', async (ctx, next) => {
	let { url } = ctx.request.body;
	// ctx.body = await ctx.post('/wx/getShareConfig', { url });
	ctx.body = {
		cd: 0,
		msg: null,
		data: {
			appId: '1', // 必填，公众号的唯一标识
			timestamp: '2', // 必填，生成签名的时间戳
			nonceStr: '3', // 必填，生成签名的随机串
			signature: '4' // 必填签名
		}
	};
});

router.post('/payConfig', async (ctx, next) => {
	let { id } = ctx.request.body;
	ctx.body = {
		cd: 0,
		msg: '',
		data: {
			appId: 'res.data.appId',
			timestamp: 'res.data.timestamp',
			nonceStr: 'res.data.nonceStr',
			package: 'res.data.package',
			signType: 'res.data.signType',
			paySign: 'res.data.paySign'
		}
	};
});

module.exports = router;
