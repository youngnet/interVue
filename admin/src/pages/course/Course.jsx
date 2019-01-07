import React, { Component } from "react";
import NavBar from "../common/NavBar";
import ContentBody from "../common/ContentBody"
import api from "../../utils/api";
import { Router, Link, browserHistory } from "react-router";
import {
	Table,Button,Row,Col,Select,message
} from "antd";
const Option = Select.Option;
export default class CourseManage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			dataSource: [],
			status:"-1",
			pagination: {
				current: 1,
				pageSize: 10,
				total:0,
				showQuickJumper: true,
				showSizeChanger: true,
				pageSizeOptions: ["10", "20", "50", "100"],
				onShowSizeChange: () => {
					this.showSizeChanger = true;
				}
			},
			loading: false,
			totalCourseIncome:""
		};
	}
	getColumns = () => {
		return ([
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
			}, {
				title: '课程名称',
				dataIndex: 'courseName',
				key: 'courseName',
			}, {
				title: '课程时间',
				dataIndex: 'startTime',
				key: 'startTime',
			}, {
				title: '价格',
				dataIndex: 'price',
				key: 'price',
				render: (text, record) => {
					return	 <a href="javascript:void(0)">{text}元</a>
				},
			}, {
				title: '上课用户数',
				key: 'studentCount',
				dataIndex: 'studentCount',

			}, {
				title: '上课老师 ',
				key: 'teacher',
				dataIndex: 'teacher',
			}, {
                title: this.downSelect(),
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => {  
                        switch(text){
                            case -1:return "全部";
                            case 0:return "未发布";
                            case 1:return "已发布";
                            case 2:return "进行中";
                            case 3:return "已结束";
                        }
                   } 
            },
			{
				title: '操作',
				key: 'operation',
				dataIndex: 'operation',
				render: (text, record) => {	
					return this.btnGroup(record)
				},

			}]);
	};
	toPage = (pagination) => {
        this.setState({
            pagination: {
                ...pagination
            }
		},()=>{
			this.doFetch()
		})
	};
	handleChange = (value) => {
		this.setState({
           status:value
		},()=>{
			this.doFetch()
		})
	}
	downSelect = (currentPageData) => {
        return(
            <Select defaultValue="-1" style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="-1">状态(全部)</Option>
            <Option value="0">未发布</Option>
			<Option value="1">已发布</Option>
            <Option value="2">进行中</Option>
            <Option value="3">已结束</Option>
           
          </Select>
        )
	}
	btnGroup = (record) =>{
		let status = record.status;
		if(status=="0"){
			return(<div>
						<a
						style={{ padding: "0 5px" }}
						onClick={this.publishCourse.bind(this,record.id,1)}>
						发布
						</a>
						<a
							style={{ padding: "0 5px" }}
							href="javascript:;"
							onClick={this.handleCreat.bind(this,record.id)}>
							编辑
						</a>
					</div>)
		}else if(status=="1"){
			return(<div>
				<a
				style={{ padding: "0 5px" }}
				onClick={this.publishCourse.bind(this,record.id,0)}>
				撤回
				</a>
				<a
					style={{ padding: "0 5px" }}
					href="javascript:;"
					onClick={this.handleCreat.bind(this,record.id)}>
					编辑
				</a>
			</div>)
		}else { //状态为 2or 3 
			return(<div>
				<a 
				onClick={this.repeatCourse.bind(this,record.id)}
				style={{ padding: "0 5px" }}
				>
				复用
				</a>
			</div>)
		}
	};
	async componentDidMount() {
		this.doFetch();
		this.totalCourseIncome();
	};
	totalCourseIncome = async() => {
		let res = await api('/course/totalCourseIncome');
		if(res.cd==0){
			this.setState({
				totalCourseIncome:res.data
			})
		}else{
			message.error(res.msg)
		}

	}
	handleCreat = (id) => {
		if(id!="creat"){
			this.props.history.push({
				pathname: '/course/coursemanage/edit',
				state: {
					id: id
				}	
			})	
		}else{
			this.props.history.push("/course/coursemanage/edit")
		}	
	 };
	publishCourse = async(id,isPublish) => { 
		let res = await api('/course/publishCourse',{id,isPublish});
		if(res.cd==0){
			this.doFetch();
		}else{
			message.error(res.msg)
		}
		
	};
	repeatCourse = (id) => {
		this.props.history.push({
			pathname: '/course/coursemanage/edit',
			state: {
				id: id,
				repeat:"repeat"
			}	
		})	
	};
	doFetch = async()=>{
		let {pagination,status} = this.state;

		let res = await api('/course/getList',{page: pagination.current, pagesize: pagination.pageSize,status});
		if(res.cd==0){
			pagination.total = res.data.count;
			this.setState({
				dataSource:res.data.res,
				pagination:{...pagination}
			})
		}else{
			message.error(res.msg)
		}
	};
	render() {
		let { pagination, loading ,totalCourseIncome} = this.state;
		return (
			<div>
				<NavBar parent={this} navs={[{ title: "课程管理" }]} />
				<ContentBody>
					<div>
						<Row type="flex" justify="start" align="middle" >
							<Col>
								<Button onClick={this.handleCreat.bind(this,"creat")} style={{ marginTop: 10, marginBottom: 10}} type="primary">新增课程</Button>
							</Col>
							<Col>
								<div style={{marginLeft:50}}>课程总收入：{totalCourseIncome}元</div>
							</Col>
						</Row>
						
						<Table
							loading={loading}
							dataSource={this.state.dataSource}
							bordered={true}
							columns={this.getColumns()}
							pagination={pagination}
							onChange={this.toPage}
							rowKey={record => record.id}
						/>
					</div>
				</ContentBody>
			</div>
		)
	}
}