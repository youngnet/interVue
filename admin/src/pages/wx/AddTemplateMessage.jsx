import React, { Component } from "react";
import NavBar from "../common/NavBar";
import ContentBody from "../common/ContentBody";
import ClickJump from "./wxTemplate/ClickJump";
import SendTarget from "./wxTemplate/SendTarget";
import styles from "./AddTemplateMessage.less";
import api from "../../utils/api";
import { Router, Link, browserHistory } from "react-router";
import {
	Form, Input, Button, Row, Col, Select, Radio
} from "antd";
const Option = Select.Option;
const RadioGroup = Radio.Group;
const formItemLayout = {
	labelCol: {
		sm: { span: 3 },
	},
	wrapperCol: {
		sm: { span: 20 },
	},
};
class WxTemplateMsg extends Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			isTiming: "1",
			remark: "",
			count: "1",
			jumpLink:{link:"1",linkUrl:""},
		};
	}


	async componentDidMount() {
		this.doFetch()
	};
	doFetch = () => {

	};
	
	onChangeSendTarget = (e) => {

	}
	checkSubmit = (e) =>{
		this.props.form.validateFields(async(err, values) => {
			console.log(values,"======values")
			if (err) return;
			
		})
	}
	render() {
		let { remark, isTiming, count ,jumpLink,linkUrl} = this.state;
		isTiming = isTiming.toString();
		count = count.toString();
		console.log(isTiming,count)
		let { getFieldDecorator } = this.props.form;
		return (
			<div>
				<NavBar parent={this} navs={[{ title: "微信模板消息", href: "/wx/wxmessage" }, { title: "新增模板消息" }]} />
				<ContentBody>
					<div>
						<Row>
							<Col span={16}>
								<Form>
									<h6>模板消息总览</h6>
									{/* <WxTemMsg></WxTemMsg> */}
									<h6>设置发送内容</h6>
									<Form.Item
										{...formItemLayout}
										label="点击跳转"
									>
										{getFieldDecorator('jumpLink', {
											rules: [
												{ required: true, message: '请选择或填写跳转相关信息' },
											],
											initialValue: jumpLink
										})(
											<ClickJump  />
										)}

									</Form.Item>
									<h6>设置发送对象及其他</h6>
									<Form.Item
										{...formItemLayout}
										label="群发对象"
									>
										{getFieldDecorator('send', {
											rules: [{ required: true, message: '请选择或填写群发对象' },
											{
												//validator: this.mode_validator,
											}
											],
											//initialValue: { actMode: detail.actMode, modeValue: detail.modeValue }
										})(
											<SendTarget onChangeMode={this.onChangeSendTarget} />
										)}

									</Form.Item>
									<Form.Item
										{...formItemLayout}
										label="是否定时发送"
									>
										{getFieldDecorator('isTiming', {
											rules: [{ required: true, message: '请选择是否定时发送' },
											{
												//validator: this.mode_validator,
											}
											],
											initialValue: isTiming
										})(
											<RadioGroup>
												<Radio value={"1"}>是</Radio>
												<Radio value={"0"}>否</Radio>
											</RadioGroup>
										)}

									</Form.Item>
									<Form.Item
										{...formItemLayout}
										label="点击量"
									>
										{getFieldDecorator('count', {
											rules: [{ required: true, message: '请选择是否统计点击量' }],
											initialValue: count
										})(
											<RadioGroup>
												<Radio value={"1"}>是</Radio>
												<Radio value={"0"}>否</Radio>
											</RadioGroup>
										)}

									</Form.Item>  
									<Form.Item
										{...formItemLayout}
										label="说明"
									>
										{getFieldDecorator('remark', {
										
										})(
											<Input
												type="url"
												
												placeholder="不展示给用户，自己备忘，不做限制"
												onChange={(e) => {
													this.setState({ remark: e.target.value })
												}}
											/>
										)}

									</Form.Item>
								</Form>
								<div>
									<Button
										disabled={this.state.subDisable}
										onClick={this.checkSubmit}
										style={{ marginLeft: "100px" }}
										type="primary">
										提交
                                                </Button>
									<Button
										style={{ marginLeft: 10 }}
										onClick={() => {
											// this.refs.modalopenid.showModal(
											// 	this.state.templateId, "add", this.state.useContent, linkUrl
											// );
										}}>
										发送测试
                                                </Button>
								</div>
							</Col>
							<Col span={8}>
								<h6>填写完详细内容样式</h6>
								<div className={styles.wxTemp}>
									<div className={styles.wxTitle}>
										粉丝消息预览
                                       		</div>
									<div className={styles.msgCard}>

										<ul
											style={{
												listStyle: "none",
												paddingLeft: 0
											}}>
											{/* {Object.entries(useContent).map(([key, value], index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                style={{
                                                                    wordBreak: "break-word",
                                                                    color: value.color
                                                                }}>
                                                                <span>
                                                                    {value.title}
                                                                </span>
                                                                {this.renderKeyword(
                                                                    value
                                                                )}
                                                            </li>
                                                        );
													})} */}
											<li>lalala</li>
											<li>hahaha</li>

										</ul>
									</div>
									<div className={styles.wxFooter} />
								</div>
							</Col>
						</Row>
					</div>
				</ContentBody>
			</div>
		)
	}
}
export default Form.create()(WxTemplateMsg);