import React, { Component } from "react";
import NavBar from "../common/NavBar";
import ContentBody from "../common/ContentBody"
import WithDrawal from "./userManage/WithDrawal"
import CourseRecord from "./userManage/courseRecord"
import api from "../../utils/api";
import { Router, Link, browserHistory } from "react-router";
import {
	Table, message,
} from "antd";
export default class UserManage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			dataSource: [],
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
		};
	}
	getColumns = () => {
		return ([
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
			}, {
				title: '昵称',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: '手机号',
				dataIndex: 'phone',
				key: 'phone',
			}, {
				title: '课程记录',
				dataIndex: 'course',
				key: 'course',
				render: (text, record) => {
					let obj = {
						type:"course",
						name:record.name,
						phone:record.phone,
						id:record.id
					}
					return <a href="javascript:void(0)" onClick={this.showModal.bind(this,obj)}>查看详情</a>
				},
			}, {
				title: '推广记录',
				key: 'myInviteCourseCount',
				dataIndex: 'myInviteCourseCount',
				render: (text, record) => {
					return <a href="javascript:void(0)">{text}节课</a>
				},

			}, {
				title: '推广团队 ',
				key: 'myTeamCount',
				dataIndex: 'myTeamCount',
				render: (text, record) => {
					return <a href="javascript:void(0)">{text}个</a>
				},
			}, {
				title: ' 获得收益',
				key: 'sy',
				dataIndex: 'sy',
				render: (text, record) => {
					return	 <a href="javascript:void(0)">{text}元</a>
				},
			},
			{
				title: '用户提现管理',
				key: 'withdraw',
				dataIndex: 'withdraw',
				render: (text, record) => {
					let obj = {
						type:"withDrawal",
						name:record.name,
						phone:record.phone,
						id:record.id
					}
					return <a href="javascript:void(0)" onClick={this.showModal.bind(this,obj)}>详情</a>
				},

			}]);
	};
	toPage = (pagination) => {
        this.setState({
            pagination: {
                ...pagination
            },
		})
	};
	async componentDidMount() {
        this.doFetch()
	};
	doFetch = async()=>{
		let {pagination} = this.state;

		let res = await api('/user/getList',{page: pagination.current, pagesize: pagination.pageSize});
		if(res.cd==0){
			this.setState({
				dataSource:res.data.res,
				pagination:res.data.count
			})
		}else{
			message.error(res.msg)
		}
	};
	showModal = (obj)=>{
		if(obj.type=="course"){
			this.refs.courseRecord.open(obj);
		}else{
			this.refs.withDrawal.open(obj);
		}
	}
	render() {
		let { pagination, loading } = this.state;
		return (
			<div>
				<NavBar parent={this} navs={[{ title: "用户管理" }]} />
				<ContentBody>
					<div>
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
				<CourseRecord ref="courseRecord"></CourseRecord>
				<WithDrawal ref="withDrawal"></WithDrawal>
			</div>
		)
	}
}