const LessonDetail = () => import('@/pages/lesson/lessonDetail');
const LessonSchedule = () => import('@/pages/lesson/lesson_schedule');

export default [
	{ path: '/lesson/detail', component: LessonDetail },
	{ path: '/lesson/schedule', component: LessonSchedule, meta: { needLogin: true } }
];
