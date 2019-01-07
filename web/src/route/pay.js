const PayCourse = () => import('@/pages/pay/index');

export default [ { path: '/pay/course', component: PayCourse, meta: { needLogin: true } } ];
