// import Login from '@/pages/auth/login';
const Login = () => import('@/pages/auth/login');
const Reg = () => import('@/pages/auth/register');
const BaseInfo = () => import('@/pages/auth/baseInfo');
const BindPhone = () => import('@/pages/auth/bindPhone');

export default [
	{
		path: '/login',
		component: Login,
		beforeEnter: (to, from, next) => {
			next();
		}
	},
	{ path: '/register', component: Reg },
	{ path: '/auth/baseInfo', component: BaseInfo, meta: { needLogin: true } },
	{ path: '/auth/bindPhone', component: BindPhone }
];
