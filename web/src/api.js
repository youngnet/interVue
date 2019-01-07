import axios from 'axios';

let api = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
	timeout: 30000
});
api.interceptors.response.use((res) => {
	return res.data;
});

function get(url, params = {}) {}

async function post(url, params = {}, headers = {}) {
	try {
		let res = await api.post(url, params, { headers });
		if (res.cd == -1) {
			location.href = `/login?t=${encodeURIComponent(location.href.replace(location.origin, ''))}`;
		}
		return res;
	} catch (error) {
		console.log('----请求出错----', error);
		return error;
	}
}

export default {
	install: function(Vue) {
		Vue.prototype.$ajax = this.api;
	},
	api: {
		post,
		get
	}
};
