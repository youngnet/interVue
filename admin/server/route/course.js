var router = require('koa-router')();
//获取课程列表
router.post('/getList',async (ctx, next) =>{
	let obj = ctx.request.body;
	let res = await ctx.post('/admin/course/getList',{...obj})
	ctx.body =res;
});
//根据id获取课程详情 
router.post('/getCourse',async (ctx, next) =>{
	let obj = ctx.request.body;
	let res = await ctx.post('/admin/course/getCourse',{...obj})
	ctx.body =res;
});
//课程总收入
router.post('/totalCourseIncome',async (ctx, next) =>{
	let res = await ctx.post('/admin/course/totalCourseIncome')
	ctx.body =res;
});
//发布撤回课程 
router.post('/publishCourse',async (ctx, next) =>{
	let {id,isPublish}  = ctx.request.body;
	let res = await ctx.post('/admin/course/publishCourse',{id,isPublish})
	ctx.body =res;
});


//创建课程
router.post('/insertCourse',async (ctx, next) =>{
	let {course} = ctx.request.body;
	course = JSON.parse(course)
	console.log(course,"=====course")
	let res = await ctx.postJSON('/admin/course/insertCourse',course)
	ctx.body =res;
});

//根据id编辑课程
router.post('/updateCourse',async (ctx, next) =>{
	let {course} = ctx.request.body;
	course = JSON.parse(course)
	console.log(course,"=====course")
	let res = await ctx.postJSON('/admin/course/updateCourse',course)
	ctx.body =res;
});


export default router;
