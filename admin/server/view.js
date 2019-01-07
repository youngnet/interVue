import mount from 'koa-mount';
import serve from 'koa-static';
import sendfile from 'koa-sendfile';
import path from 'path';
import compress from "koa-compress";
const compressOptions = { threshold: 2048 };

var view_path=path.resolve(__dirname, '../dist/');

var router = require('koa-router')();






// router.get('/login',sendFileIndex);

// router.get('/logout',async (ctx,next)=> {
// 	ctx.clearSess&&ctx.clearSess();
//     await ctx.redirect('/login');
// });

router.redirect('/', '/user/usermanage');
// router.get('/auth/:path*',sendFileIndex);
router.get('/user/:path*',sendFileIndex);
router.get('/course/:path*',sendFileIndex);
router.get('/wx/:path*',sendFileIndex);
router.get('/login',sendFileIndex);
async function sendFileIndex(ctx, next){
	await sendfile(ctx, `${view_path}/index.html`);
}



export default function(app){
	app.use(compress(compressOptions));
    app.use(serve(__dirname+ '/'+ '../dist'));
    app.use(mount('/resource', serve(__dirname + '/' + '../../resource')));

    app.use(router.routes()).use(router.allowedMethods());
   
    app.use(async (ctx, next) => {
	  try {
	  	if(ctx.status != 200){
	  		await sendfile(ctx, `${view_path}/error/${ctx.status}.html`);
	  		return
	  	}
	    await next();
	  } catch (err) {
	    throw err;
	  }
	});




}
