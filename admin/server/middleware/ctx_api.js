import axios from 'axios';
import querystring from 'querystring';
const CONFIG = require(`../../config.${process.env.NODE_ENV}.json`);
const axiosConfig = {
	timeout: 60000,
	baseURL: CONFIG.BASEURL}
let instance = axios.create(axiosConfig);
import axiosFile from "axios-file";
export default function (ctx){
	ctx.get = async (url,params={}) => {s
		let result = {};
		try{
			let strParams = querystring.stringify(params);
			result = await instance.get(url)
		}catch(e){
			result = e.response
		}
		return result.data;
	} 
	ctx.post = async (url,request={})=>{
		return await post(ctx,url,request)
	}
	ctx.postJSON = async (url,request={}) => {
		let headers = {
		  'Content-Type': 'application/json',
		}
		return await post(ctx,url,request,headers)
	}
	ctx.upload = async (url , request={}) => {
		let result = null;
		let {ticket=ctx.ticket,...other} = request;
		let headers = {'cache-control': 'no-cache'}
		
		if(ticket){
			 headers.t = ticket;
		}
		try{
			result = await axiosFile({
				baseURL:CONFIG.BASEURL,
				method:"post",
				url,
				data:request,
				  headers,
			});
		}catch(e){
			console.log(e,"========")
			result = {data:{cd:1,msg:"上传失败"}}
		}
		return result.data
	}
}
async function post(ctx,url,request,headers={}){

	let {ticket=ctx.ticket,responseType="json",...other} = request;
	if(!headers['Content-Type']){
		headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		  }
	}
    if(ticket){
		headers.t = ticket;
	}
	instance.defaults.responseType = responseType
	let result = {};
	try{
		let data = querystring.stringify(other);
		if(headers['Content-Type']== 'application/json' ){
			data = JSON.stringify(other);
		}
		result = await instance.post(url,data,{headers});
	}catch(e){
		result = e.response||{data:{cd:1,msg:'请求超时'}};
	}
	result = result.data;
	if(result.cd == -1){
		ctx.clearSess();
		return {cd:-1,msg:'token失效请重新登录',data:null};
	}
	return result;
}
