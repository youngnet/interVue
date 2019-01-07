const path = require('path');
const sendFile = require('koa-sendfile');
const filePath = path.join(__dirname, '../dist');
// 静态文件目录dev读取用
const staticPath = path.join(__dirname, '../dist');
// process.env.NODE_ENV === 'production' ? path.join(__dirname, '../dist') : path.join(__dirname, '..');

module.exports = function(router) {
	router.get('/static/*', async (ctx, next) => {
		await sendFile(ctx, staticPath + ctx.request.url);
	});
	router.get('/', async (ctx, next) => {
		await sendFile(ctx, `${filePath}/index.html`);
	});
	
	router.get('/register', async (ctx, next) => {
		await sendFile(ctx, `${filePath}/index.html`);
	});

	router.get('/mine/:path*', async (ctx, next) => {
		await sendFile(ctx, `${filePath}/index.html`);
	});
	router.get('/lesson/:path*', async (ctx, next) => {
		await sendFile(ctx, `${filePath}/index.html`);
	});
	router.get('/pay/:path*', async (ctx, next) => {
		await sendFile(ctx, `${filePath}/index.html`);
	});

	router.get('/auth/:path*', async (ctx, next) => {
		await sendFile(ctx, `${filePath}/index.html`);
	});

	router.get('/404', async (ctx, next) => {
		await sendFile(ctx, `${filePath}/index.html`);
	});
	router.get('/500', async (ctx, next) => {
		await sendFile(ctx, `${filePath}/index.html`);
	});
};
