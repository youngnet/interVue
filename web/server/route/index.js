const Router = require('koa-router');
const router = new Router();
const mine = require('./mine');
const auth = require('./auth');
const lesson = require('./lesson');
const weixin = require('./weixin');
const extend = require('./extend');
const getReq = require('./getReq');
const sendFile = require('../sendFile');

// 静态资源处理
router.use(getReq.routes());
sendFile(router);

// 路由请求处理
router.use('/mine', mine.routes());
router.use('/auth', auth.routes());
router.use('/lesson', lesson.routes());
router.use('/weixin', weixin.routes());
router.use(extend.routes());

module.exports = router;
