const Mine = () => import(/* webpackChunkName: "show" */ '@/pages/mine');
const MyCourse = () => import('@/pages/mine/myCourse');
const Setting = () => import('@/pages/mine/setting');
const Wallet = () => import('@/pages/mine/wallet');
const Extend = () => import('@/pages/mine/extend');
const ExtendMonthList = () => import('@/pages/mine/extend/extend_list');
const ExtendDetailList = () => import('@/pages/mine/extend/detail_list');
const changePhone = () => import('@/pages/mine/changePhone');
const WalletDetail = () => import('@/pages/mine/wallet/wallet_detail');
const WithDraw = () => import('@/pages/mine/wallet/withdraw');
const NeedLearn = () => import('@/pages/lesson/needLearn');
const Learned = () => import('@/pages/lesson/learned');
const MyTeamList = () => import('@/pages/mine/extend/myTeamList');

export default [
	{ path: '/', redirect: '/mine' },
	{ path: '/mine', component: Mine, meta: { needLogin: true } },
	{ path: '/mine/setting', component: Setting, meta: { needLogin: true } },
	{
		path: '/mine/course',
		component: MyCourse,
		children: [
			{ path: 'needLearn', component: NeedLearn, meta: { needLogin: true } },
			{ path: 'learned', component: Learned, meta: { needLogin: true } }
		]
	},
	{ path: '/mine/extend_month_list', component: ExtendMonthList, meta: { needLogin: true } },
	{ path: '/mine/extend_detail', component: ExtendDetailList, meta: { needLogin: true } },
	{ path: '/mine/my_team_list', component: MyTeamList, meta: { needLogin: true } },
	{ path: '/mine/extend', component: Extend, meta: { needLogin: true } },
	{ path: '/mine/wallet', component: Wallet, meta: { needLogin: true } },
	{ path: '/mine/changePhone', component: changePhone, meta: { needLogin: true } },
	{ path: '/mine/walletDetail', component: WalletDetail, meta: { needLogin: true } },
	{ path: '/mine/withdraw', component: WithDraw, meta: { needLogin: true } }
];
