// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './route';
import api from './api';
import VueMeta from 'vue-meta';
// Vue.config.productionTip = false;
import moment from 'moment';
moment.locale('zh-cn');
import * as filters from './utils/filters';
import { Toast, Dialog, Notify } from 'vant';

Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Notify);
Vue.prototype.$moment = moment;

// 注册全局过滤器
Object.entries(filters).forEach(([ key, value ]) => {
	Vue.filter(key, value);
});
// 请求api
Vue.use(api);
Vue.use(VueMeta);

/* eslint-disable no-new */
router.beforeEach(async (to, from, next) => {
	if (to.meta.needLogin) {
		let res = await api.api.post('/auth/getUserInfo');
		if (res.cd == 0) {
			Vue.prototype.$userInfo = res.data;
		} else if (res.cd == -2) {
			router.history.push(`/500`);
			return;
		} else {
			window.location.href = `/login?t=${to.fullPath}`;
			return;
		}
		if (to.path === '/mine') {
			let res = await api.api.post('/auth/getFamily');
			if (res.cd != 0) {
				router.history.push(`/auth/baseInfo`);
			}
		}
	}
	next();
});
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});
