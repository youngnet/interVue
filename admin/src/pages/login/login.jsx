import React, { Component } from "react";
import NavBar from "../common/NavBar";
import ContentBody from "../common/ContentBody"
import api from "../../utils/api";
import { Router, Link, browserHistory } from "react-router";
import styles from "./login.less";
import {Form, Input, Button, Checkbox,Row,Col,message} from 'antd';

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 16 },
  };
  const formTailLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8, offset: 4 },
  };
 class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			isdisabled:false,
			key:"",
			img_code :""
		};
	}

	async componentDidMount() {
		this.getImgCode();
	};
	getImgCode = () =>{
		let key = Math.random().toString().slice(2,10);
		let img_code = `/login/getCode?phone=${key}&time=${Math.random()}`;
		this.setState({
			key,
			img_code
		})
	}
	check = () => {
		this.props.form.validateFields(async(err, values) => {
			if (err) return;
			let {code_key} = this.state;
			values.code_key = code_key;
			this.setState({
				isdisabled:true,
				loading:true
			})
			let  res = await api('/login/adminlogin', { ...values });
			if(res.cd==0){
				message.success("登录成功",()=>{
					//this.props.history.push("/user/usermanage")
					window.location.href = window.location.origin+"/user/usermanage";
				})
				
			}else{
				message.error(res.msg)
				this.setState({
					isdisabled:false,
					loading:false
				})
			}
        });
	  }
	// phone_validator = (rule,value,callback) => {
	// 	let flag = /^1\d{10}$/.test(value);
	// 	if(!flag){
	// 		callback("请输入正确的手机号");
	// 	}	
	// 	callback();
	// };
	render() {
		let {loading,isdisabled,img_code } = this.state;
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<ContentBody>
					<div className={styles.box}>
						<div className={styles.mt30}>
							<Form.Item {...formItemLayout} label="用户名">
							{getFieldDecorator('name', {
								rules: [{
								required: true,
								message: '请输入用户名',
								}],
							})(
								<Input placeholder="请输入用户名" />
							)}
							</Form.Item>
							<Form.Item {...formItemLayout} label="密码">
							{getFieldDecorator('passwd', {
								rules: [{
								required: true,
								message: '请输入密码',
								}],
							})(
								<Input type="password" placeholder="请输入密码" />
							)}
							</Form.Item>
							<Form.Item
							{...formItemLayout}
							label="验证码"
							>
							<Row gutter={8}>
								<Col span={12}>
								{getFieldDecorator('img_code', {
									rules: [{ required: true, message: '请输入图形验证码' }],
								})(
									<Input placeholder="图形验证码" />
								)}
								</Col>
								<Col span={12} onClick = {this.getImgCode}>
									<div style={{width:"100%",height:30}}>
										<img style={{height: 31,width: "90%",left: 8,position: "relative",top:-2}} src={img_code} alt=""/>
									</div>
								</Col>
							</Row>
							</Form.Item>
							<Form.Item>
							<Button type="primary" disabled={isdisabled} style={{width:"83%",margin:"0 auto",display:"block"}} onClick={this.check}>
								登录
							</Button>
							</Form.Item>
						</div>	
					</div>				
				</ContentBody>
			</div>
	    );	
	}
}
export default  Form.create()(Login);