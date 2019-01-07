const Router = require('koa-router');
const router = new Router();

// 课程详情
router.post('/detail', async (ctx, next) => {
	let user = await ctx.sess();
	let { id } = ctx.request.body;
	let res = await ctx.post('/course/getCourse', { id, userId: user.data.id });
	ctx.body = res;
});

// 往期回放
router.post('/learnedList', async (ctx, next) => {
	let user = await ctx.sess();
	let { page, pagesize = 10 } = ctx.request.body;
	let res = await ctx.post('/course/getMyCourseListHistory', { page, pagesize, userId: user.data.id });
	ctx.body = res;
});

// 待上课
router.post('/needLearnList', async (ctx, next) => {
	let user = await ctx.sess();
	let { page, pagesize = 10 } = ctx.request.body;
	let res = await ctx.post('/course/getMyCourseList', { page, pagesize, userId: user.data.id });
	ctx.body = res;
});

// 课程列表
router.post('/list', async (ctx, next) => {
	let { date = '2019-01-02' } = ctx.request.body;
	let res = await ctx.post('/course/getCourseListByDate', { date });
	ctx.body = res;
});

// 预定课程
router.post('/bookCourse', async (ctx, next) => {
	let user = await ctx.sess();
	let { courseId, wxOpenId } = ctx.request.body;
	let res = await ctx.post('/course/bookCourse', { courseId, wxOpenId, userId: user.data.id });
	ctx.body = res;
});

// 取消报名
router.post('/bookCancel', async (ctx, next) => {
	let user = await ctx.sess();
	let { courseId } = ctx.request.body;
	let res = await ctx.post('/course/orderRefund', { courseId, userId: user.data.id });
	ctx.body = res;
});

module.exports = router;
