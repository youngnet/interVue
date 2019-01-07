import Vue from 'vue';
import Router from 'vue-router';
import auth from './auth';
import mine from './mine';
import lesson from './lesson';
import pay from './pay';
import NotFound from '@/pages/error/404';
import ServerErr from '@/pages/error/500';

Vue.use(Router);

const routes = [].concat(
	auth,
	mine,
	lesson,
	pay,
	{ path: '/500', component: ServerErr },
	{ path: '*', component: NotFound }
);

const router = new Router({
	mode: 'history',
	routes
});

export default router;
