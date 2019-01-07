const Router = require('koa-router');
const router = new Router();

// 推广首页
router.post('/courseInvite/inviteCenter', async (ctx, next) => {
	let user = await ctx.sess();
	let res = await ctx.post('/courseInvite/inviteCenter', { userId: user.data.id });
	ctx.body = res;
});

// 我的推广课程
router.post('/courseInvite/myInviteCourseMonthList', async (ctx, next) => {
	let user = await ctx.sess();
	let res = await ctx.post('/courseInvite/myInviteCourseMonthList', { userId: user.data.id });
	ctx.body = res;
});

// 我的推广课程(月详情)
router.post('/courseInvite/myInviteCourseListByMonth', async (ctx, next) => {
	let user = await ctx.sess();
	let { inviteMonth } = ctx.request.body;
	let res = await ctx.post('/courseInvite/myInviteCourseListByMonth', { userId: user.data.id, inviteMonth });
	ctx.body = res;
});

// 我的团队列表
router.post('/courseInvite/myTeamList', async (ctx, next) => {
	let user = await ctx.sess();
	let res = await ctx.post('/courseInvite/myTeamList', { userId: user.data.id });
	ctx.body = res;
});


module.exports = router;
