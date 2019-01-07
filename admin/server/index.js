'use strict';

import koa from 'koa';
var app=new koa();
import route from './route';


const CONFIG = require(`../config.${process.env.NODE_ENV}.json`);

app.keys = ['project main-site secret', 'stronger the song', 'stronger the role'];



var bodyParser = require('koa-bodyparser')
app.use(bodyParser({
    "formLimit" : "50mb",
    "jsonLimit":"50mb",
    "textLimit":"50mb"
}));
app.use(require('koa-logger')());
app.use(async (ctx, next) => {
	ctx.CONFIG = CONFIG;
	await next()
})

require('./middleware').default(app);
app.use(route.routes()).use(route.allowedMethods());
require('./view').default(app);








process.on('uncaughtException', function(err) {
  console.log('异常捕捉:',err);
});

export default app;

