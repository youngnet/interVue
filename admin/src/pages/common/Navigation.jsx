import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import styles from "./Navigation.less";


export default class Navigation extends Component {

	constructor(props) {
		super(props)
		let path = props.history.location.pathname;
		let hideMenu = path=="/login"
		this.state = {
			collapsed: false,
			hideMenu
		};
	}
	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	}
	menuClick = (e)=>{
		let evt =e.item.props["data-href"]
		if(evt){
			this.props.history.push(evt)
		}
	}
	render() {
		let {hideMenu} = this.state;
		console.log(hideMenu)
		if(hideMenu){
			return(
				<div>
					{this.props.children}
				</div>
			)	
		} 
		return (
			<Layout  style={{ minHeight: '100vh'}}>
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}
				>
					<div className={styles.logo}>双语国际</div>
					<Menu theme="dark" defaultSelectedKeys={['6']} mode="inline" onClick={this.menuClick} >
						{/* <SubMenu
							key="1"
							title={<span><Icon type="user" /><span>用户管理</span></span>}
						>
							<Menu.Item data-href="/user/usermanage" key="3">课程记录</Menu.Item>
							<Menu.Item data-href="/user/withDrawalmanage" key="4">提现管理</Menu.Item>
						</SubMenu>
						<SubMenu
							key="2"
							title={<span><Icon type="team" /><span>课程管理</span></span>}
						>
							<Menu.Item key="6">新增课程</Menu.Item>
						</SubMenu>
						<SubMenu
							key="3"
							title={<span><Icon type="team" /><span>微信模板消息</span></span>}
						>
							<Menu.Item key="7">新增模板消息</Menu.Item>
						</SubMenu> */}
						<Menu.Item key="1" data-href="/user/usermanage">
							<span>用户管理</span>
						</Menu.Item>
						<Menu.Item key="2" data-href="/course/coursemanage">
							<span>课程管理</span>
						</Menu.Item>
						<Menu.Item key="3" data-href="/wx/wxmessage">
							<span>微信模板消息</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
				<Header style={{ background: '#fff', padding: 0 ,float:"right",height:46}}>
						<Menu className="header-menu" mode="horizontal" style={{float:"right"}}>
							<SubMenu  title={<span><Icon type="user" />dongruinan</span>}>
								<Menu.Item key="logout" >
									<a href="/logout">注销</a>
								</Menu.Item>
							</SubMenu>
						</Menu>
					</Header>
					<Content style={{ margin: '16px' }}>
						<div>
							{this.props.children}
           				</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						由 云简(北京)网络科技有限公司 提供技术支持
        			</Footer>
				</Layout>
			</Layout>

		);
	}
}

