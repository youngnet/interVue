import axios from 'axios';
import qs from 'qs';
const config = require(`../config.${process.env.NODE_ENV}.json`);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const instance = axios.create({
	baseURL: config.baseURL,
	timeout: 30000
});

async function post(url, data = {}, options = {}) {
	var result = {};
	let headers = options.headers || {};
	try {
		if (headers['Content-Type'] == 'application/json') {
			data = JSON.stringify(data);
		} else {
			data = qs.stringify(data);
		}
		// console.log(this.ticket);
		if (this.ticket) {
			headers.t = this.ticket;
		}
		// console.log(data , "----data",headers)

		result = await instance.post(url, data, { ...options, headers });
	} catch (e) {
		console.log(e, '---api_catch---');

		return {
			cd: -2,
			msg: '请求出错了',
			data: null
		};
	}

	if (result && result.data.cd == -1) {
		this.clearSess();
		return { cd: -1, msg: '登录状态失效请重新登录', data: null };
	}
	return result.data;
}

async function get(url, type, opts = {}) {
	var result = {};

	try {
		result = await instance.get(url, opts);
	} catch (e) {
		console.log(e, '---api_catch---');
		result = e.response || {
			cd: -2,
			msg: 'api_catch',
			data: null
		};
	}
	return result.data;
}

export default {
	post,
	get
};
