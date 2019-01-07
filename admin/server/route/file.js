var router = require('koa-router')();
import asyncBusboy from '../common/parsefile';
import fs from 'fs';






router.post('/upload-imgs',async (ctx,next) => {
    const {files,fields} = await asyncBusboy(ctx.req);
     let {type} = fields;
     let file = files[0];
     let result = await ctx.upload('/file/upload',{file,type})
     ctx.body = result;
});








export default router;
