import React, { Component } from "react";
import NavBar from "../common/NavBar";
import ContentBody from "../common/ContentBody"
import api from "../../utils/api";
import { Router, Link, browserHistory } from "react-router";
import {
	Table,Button,Row,Col,Select
} from "antd";
const Option = Select.Option;
const data =[
	{id:1,name:"wang",phone:"18511995934",course:"1000",tg:"12",tgtd:"jim1",sy:"100",withdraw:"1"},
	{id:2,name:"wang",phone:"18511995934",course:"1000",tg:"",tgtd:"jim1",sy:"100",withdraw:"1"},
	{id:3,name:"wang",phone:"18511995934",course:"1000",tg:"12",tgtd:"jim1",sy:"100",withdraw:"1"},
	{id:4,name:"wang",phone:"18511995934",course:"1000",tg:"12",tgtd:"jim1",sy:"100",withdraw:"1"},
	{id:5,name:"wang",phone:"18511995934",course:"1000",tg:"12",tgtd:"jim1",sy:"100",withdraw:"1"},
	{id:6,name:"dong",phone:"18511995935",course:"1000",tg:"",tgtd:"jim2",sy:"200",withdraw:"1"},
	{id:7,name:"dong",phone:"18511995935",course:"1000",tg:"12",tgtd:"jim2",sy:"200",withdraw:"1"},
	{id:8,name:"dong",phone:"18511995935",course:"1000",tg:"12",tgtd:"jim2",sy:"200",withdraw:"1"},
	{id:9,name:"dong",phone:"18511995935",course:"1000",tg:"12",tgtd:"jim2",sy:"200",withdraw:"1"},
	{id:10,name:"dong",phone:"18511995935",course:"12345",tg:"23",tgtd:"jim2",sy:"200",withdraw:"1"},
	{id:11,name:"dong",phone:"18511995936",course:"12345",tg:"23",tgtd:"jim3",sy:"300",withdraw:"1"},
	{id:12,name:"dong",phone:"18511995936",course:"12345",tg:"23",tgtd:"jim3",sy:"300",withdraw:"1"},
	{id:13,name:"dong",phone:"18511995936",course:"12345",tg:"",tgtd:"jim3",sy:"300",withdraw:"1"},
	{id:14,name:"dong",phone:"18511995936",course:"12345",tg:"23",tgtd:"jim3",sy:"300",withdraw:"1"},
	{id:15,name:"dong",phone:"18511995936",course:"12345",tg:"23",tgtd:"jim3",sy:"300",withdraw:"1"},
	{id:16,name:"zhao",phone:"18511995937",course:"12345",tg:"23",tgtd:"jim4",sy:"400",withdraw:"1"},
	{id:17,name:"zhao",phone:"18511995937",course:"12345",tg:"",tgtd:"jim4",sy:"400",withdraw:"1"},
	{id:18,name:"zhao",phone:"18511995937",course:"12345",tg:"23",tgtd:"jim4",sy:"400",withdraw:"1"},
	{id:19,name:"zhao",phone:"18511995937",course:"12345",tg:"23",tgtd:"jim4",sy:"400",withdraw:"1"},
	{id:20,name:"zhao",phone:"18511995937",course:"12345",tg:"",tgtd:"jim4",sy:"400",withdraw:"1"},
	{id:21,name:"zhao",phone:"18511995937",course:"12345",tg:"23",tgtd:"jim5",sy:"500",withdraw:"1"},
	{id:22,name:"zhao",phone:"18511995937",course:"12345",tg:"",tgtd:"jim5",sy:"500",withdraw:"1"},
	{id:23,name:"zhao",phone:"18511995937",course:"12345",tg:"23",tgtd:"jim5",sy:"500",withdraw:"1"},
]
export default class WxManage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			dataSource: [],
			pagination: {
				current: 1,
				pageSize: 10,
				total:23,
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
				title: '模板消息',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: '发送时间',
				dataIndex: 'phone',
				key: 'phone',
			},{
                title: this.downSelect(),
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => {  
                        switch(text){
                            case 1:return "未发送";
                            case 2:return "已发送";
                        }
                   } 
			},
			{
				title: '说明',
				dataIndex: 'course',
				key: 'course',
				render: (text, record) => {
					return	 <a href="javascript:void(0)">{text}元</a>
				},
			}, {
				title: '操作人',
				key: 'tg',
				dataIndex: 'tg',
				render: (text, record) => {
					if(text){
						return text
					}else{
						return "--"
					}
				},

			},
			{
				title: '操作',
				key: 'withdraw',
				dataIndex: 'withdraw',
				render: (text, record) => {
					return(<div>
						<a
						style={{ padding: "0 5px" }}
						href={`/wx/tempaddmessage?id=${record.id}&type=msg&operation=1`}>
						发送
						</a>
						<a
						style={{ padding: "0 5px" }}
						href={`/wx/tempaddmessage?id=${record.id}&type=msg&operation=1`}>
						编辑
						</a>
						<a
							style={{ padding: "0 5px" }}
							href="javascript:;"
							onClick={() => {
								
							}}>
							测试
						</a>
						<a
							style={{ padding: "0 5px" }}
							href="javascript:;"
							onClick={() => {
								this.alertModal(record.id);
							}}>
							删除
						</a>
					</div>)
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
	downSelect = (currentPageData)=>{
        return(
            <Select defaultValue="none" style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="none">状态(全部)</Option>
            <Option value="1">未发送</Option>
            <Option value="2">已发送</Option>
          </Select>
        )
    }
	async componentDidMount() {
        this.doFetch()
	};
	handleCreat = () => {
		this.props.history.push("/wx/AddTemplateMessage")
		// this.props.history.push({
		// 	pathname: '/course/coursemanage/edit',
		// 	state: {
		// 		id: 3
		// 	}	
		// })	
	 };
	doFetch = ()=>{
		this.setState({
			dataSource:data
		})
	};
	render() {
		let { pagination, loading } = this.state;
		return (
			<div>
				<NavBar parent={this} navs={[{ title: "微信模板消息" }]} />
				<ContentBody>
					<div>
						<Button onClick={this.handleCreat} style={{ marginTop: 10, marginBottom: 10}} type="primary">新增模板消息</Button>
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