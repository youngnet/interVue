import axios from '../api';
import { resolve } from 'any-promise';
import chalk from 'chalk';

class weixinUtil {
	constructor() {}
	async initPay(data) {
		// let res = await axios.api.post('/weixin/payConfig', { id });
		return new Promise((resolve, reject) => {
			wx.chooseWXPay({
				appId: data.appId,
				timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
				package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
				signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: data.paySign, // 支付签名
				success: function(result) {
					// 支付成功后的回调函数
					resolve(result);
				},
				fail: function(result) {
					resolve(result);
				}
			});
		});
	}
	shareConfig({ title = '双语国际', desc, link = location.href.split('#')[0], imgUrl, timeLineTitle = '双语国际' }) {
		wx.ready(function() {
			// 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
			wx.updateAppMessageShareData({
				title: title, // 分享标题
				desc: desc, // 分享描述
				link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: imgUrl, // 分享图标
				success: function() {
					// 设置成功
				}
			});
			// 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
			wx.updateTimelineShareData({
				title: timeLineTitle, // 分享标题
				link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: desc, // 分享图标
				success: function() {
					// 设置成功
				}
			});
		});
	}
	async config(params={}) {
		/**
         * @param title 分享标题
         * @param desc 分享描述
         * @param link 分享连接
         * @param imgUrl 分享图标
         * @param timeLineTitle 分享朋友圈标题
         */
		let res = await axios.api.post('/weixin/shareConfig', { url: params.link || location.href.split('#')[0] });
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: res.data.appId, // 必填，公众号的唯一标识
			timestamp: res.data.timestamp, // 必填，生成签名的时间戳
			nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
			signature: res.data.signature, // 必填，签名
			jsApiList: [ 'updateAppMessageShareData', 'updateTimelineShareData', 'previewImage' ] // 必填，需要使用的JS接口列表
		});
		this.shareConfig(params);
	}
	pay(wxq) {
		return new Promise((resolve, reject) => {
			function onBridgeReady() {
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest',
					{
						appId: wxq.appId, //公众号名称，由商户传入
						timeStamp: wxq.timeStamp, //时间戳，自1970年以来的秒数
						nonceStr: wxq.nonceStr, //随机串
						signType: 'MD5', //微信签名方式：
						package: wxq.package,
						paySign: wxq.paySign //微信签名
					},
					function(res) {
						// console.log('​onBridgeReady -> res', res);
						if (res.err_msg == 'get_brand_wcpay_request:ok') {
							resolve({ cd: 0 });
						}
						resolve({ cd: 1, data: res });
					}
				);
			}

			if (typeof WeixinJSBridge == 'undefined') {
				if (document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				} else if (document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				}
			} else {
				onBridgeReady();
			}
		});
		// console.log(wxq,'--------')
	}
}

export default new weixinUtil();
