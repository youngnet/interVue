import React,{Component} from "react";

import {Form,Modal,Select,Table,message} from "antd";

import api from "../../../utils/api";
const Option = Select.Option;
export default class withDrawal extends Component {

	constructor(props){
		super(props);
		this.state = {
			visible:false,
            dataSource: [],
            name:"",
            phone:"",
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
		}
	}
	doFetch = async()=>{
		let {pagination} = this.state;
		let res = await api('/user/withdrawRecord',{page: pagination.current, pagesize: pagination.pageSize});
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
    getColumns = () => {
		return ([
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
			}, {
				title: '提现时间',
				dataIndex: 'createTime',
				key: 'createTime',
			}, {
				title: '提现金额',
				dataIndex: 'amount',
				key: 'amount',
			}, {
				title: '提现标记',
				dataIndex: 'status',
				key: 'status',
			}]);
	};
	open(obj){
		this.setState({
            visible:true,
            name:obj.name,
            phone:obj.phone
		},()=>{
			this.doFetch()
		})
    };
    toPage = (pagination) => {
        this.setState({
            pagination: {
                ...pagination
            },
		})
	};
    close = () => {
        this.setState({visible: false});
    };
	render(){
		let {visible,pagination, loading,name,phone } = this.state;
		return (
			<div>
				<Modal
                    title="提现记录"
                    width={750}
					visible={visible}
					onOk={this.close}
					onCancel={this.close}
					destroyOnClose={true}
				>
                    <div style={{marginBottom:15}}>
                        <span style={{marginRight:10}}>昵称:</span>{name}
                        <span style={{margin:"0 10px"}}>手机号:</span>{phone}
                    </div>
					<Table
							loading={loading}
							dataSource={this.state.dataSource}
							bordered={true}
							columns={this.getColumns()}
							pagination={pagination}
							onChange={this.toPage}
							rowKey={record => record.id}
						/>
				</Modal>
			</div>
		)
	}
}


