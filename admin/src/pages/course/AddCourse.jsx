import React, { Component } from "react";
import NavBar from "../common/NavBar";
import ContentBody from "../common/ContentBody"
import UploadImage from "../common/UploadImage";
import api from "../../utils/api";
import moment from "moment";
import { Router, Link, browserHistory } from "react-router";
import {Button, Row,Col, Form,Input, message,Tabs,Table,List,Tag,Divider,Radio,Card, Upload,Icon,Select, Modal,Popover, DatePicker} from "antd";
const {RangePicker} = DatePicker;
const formItemLayout = {
	labelCol: {
	  xs: { span: 24 },
	  sm: { span: 6 },
	  md:{ span: 4},
	  xl:{span:4}
	},
	wrapperCol: {
	  xs: { span: 24 },
	  sm: { span: 16 },
	  md:{ span: 12},
	  xl:{span:8}
	},
  };
 class AddScourse extends Component {
    
	constructor(props) {
        super(props)
        let {id,repeat=false} = this.props.history.location.state||{};
		this.state = {
            loading: false,
            details:{},
            id,
            disabled:false,
            repeat
		};
	}
	async componentDidMount() {
        let {id} = this.state;
        if(id){
            let res = await api('/course/getCourse', { id });
            if (res.cd == 0) {
              this.setState({
                  details:res.data,
                  id
              })
              this.props.form.setFieldsValue({"picUrl":res.data.picUrl || "aas"})
            } else {
                message.error(res.msg);
            }
        }
	};
	handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (err) return;
            values.startTime = values.courseTime[0].format('YYYY-MM-DD HH:mm:ss');
            values.endTime = values.courseTime[1].format('YYYY-MM-DD HH:mm:ss');
            delete values.courseTime;
            this.save(values);

        });
    }
     save = async(values) => {
        let {id,repeat} = this.state;
        this.setState({ loading: true ,disabled:true});
        let result;
        if(id && !repeat){
             values.id = id;
             result = await api('/course/updateCourse',{course:JSON.stringify(values)})
        }else{
            result = await api('/course/insertCourse',{course:JSON.stringify(values)})
        }
        if(result.cd != 0){
            this.setState({ loading: false ,disabled:false});
            message.error(result.msg)
            return
        }
        message.success('操作成功' ,() => {
            this.props.history.push("/course/coursemanage")
        })
    }
	back = ()=>{
		this.props.history.push("/course/coursemanage")
	}
	render() {
        const { getFieldDecorator } = this.props.form;
        let {details,id,disabled} = this.state,courseTime = null;
        if(id && !details.id) return null;
        if(details.startTime && details.endTime){
            courseTime = [moment(details.startTime),moment(details.endTime)]
        }
		return (
			<div>
				<NavBar parent={this} navs={[{title:"课程管理",href:"/course/coursemanage"},{ title: "新增课程" }]} />
				<ContentBody>
					<div>
					<Form  >
                            <Form.Item
                                {...formItemLayout}
                                label="课程名称"
                            >
                                {getFieldDecorator('courseName', {
                                    rules: [{ required: true, message: '请输入课程名称' }],
                                    initialValue:details.courseName                       
                                })(
                                    <Input placeholder="请输入课程名称"  />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="课程时间"
                            >
                                {getFieldDecorator('courseTime', {
                                    rules: [{ required: true, message: '请输入课程时间' }], 
                                    initialValue:courseTime                       
                                })(
                                    <RangePicker
                                      showTime={{ format: 'HH:mm:ss'}}
                                      disabledDate={this.disabledDate}
                                      format="YYYY-MM-DD HH:mm:ss"
                                      placeholder={['开始时间', '结束时间']}
                                    />
                                )}
                            </Form.Item>   
							<Form.Item
                                {...formItemLayout}
                                label="上课老师"
                            >
                                {getFieldDecorator('teacher', {
                                    rules: [{ required: true, message: '请输入上课老师名称' }],
                                    initialValue:details.teacher                       
                                })(
                                    <Input placeholder="请输入上课老师名称"  />
                                )}
                            </Form.Item>
							<Form.Item
                                {...formItemLayout}
                                label="课程价格"
                            >
                                {getFieldDecorator('price', {
                                    rules: [{ required: true, message: '请输入课程价格' }],
                                    initialValue:details.price                       
                                })(
                                    <Input placeholder="请输入课程价格"  />
                                )}
                            </Form.Item>
							<Form.Item
                                {...formItemLayout}
                                label="课程简介"
                            >
                                {getFieldDecorator('description', {
                                    rules: [{ required: true, message: '请输入课程简介' }],
                                    initialValue:details.description                       
                                })(
                                    <Input placeholder="请输入课程简介"  />
                                )}
                            </Form.Item>
							<Form.Item
                                {...formItemLayout}
                                label="活动头图"
                            >
                                {getFieldDecorator('picUrl',{
                                    rules: [{ required: true, message: '请上传活动头图' }],
                                    initialValue:details.picUrl 
                                })(
                                   <UploadImage  />
                                )}
                            </Form.Item>
					</Form>		
					<div style={{textAlign:"center"}}>
                             
                                <Button disabled={disabled} type="primary" onClick={this.handleSubmit}  >提交</Button>
                                   
                                
                                <Button style={{ marginLeft: 8 , marginRight: 20}} onClick={this.back} >
                                     返回
                                </Button>
                            </div>
					</div>
				</ContentBody>
			</div>
		)
	}
}
export default  Form.create()(AddScourse);