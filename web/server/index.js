const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const router = require('./route');
const session = require('./userInfo');
const compress = require('koa-compress');
import api from './api';
const options = { threshold: 1024 };
app.keys = ['im a newer secret'];

app.use(compress(options));
app.use(
	bodyParser({
		formLimit: '50mb',
		jsonLimit: '50mb',
		textLimit: '50mb'
	})
);
app.use(async (ctx, next) => {
	session(ctx);
	ctx.post = api.post;
	ctx.get = api.get;
	console.log('requestUrl -> ', ctx.protocol, ctx.request.url);
	await next();
});

app.use(router.routes());

app.listen(6060, () => {
	console.log('- nodejs is listening on 6060 -');
});
