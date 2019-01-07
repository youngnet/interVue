import moment from 'moment';
moment.locale('zh-cn');
// vue全局filter文件
export function toFixed(value) {
	return value.toFixed(2);
}
export function phoneHide(phone) {
	return phone.substr(0, 3) + '****' + phone.substr(7);
}

export function weekFormat(time) {
	return moment(time).format('dddd');
}

export function dayFormat(time) {
	return moment(time).format('YYYY-MM-DD');
}

export function clockFormat(time) {
	return moment(time).format('hh:mm');
}

export function specialFormat(time) {
	return moment(time).format('DD日dddd');
}
