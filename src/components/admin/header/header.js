import React, { Component } from 'react'
import {Icon, Layout,Avatar,Dropdown,Menu} from "antd";
import './header.less'
const { Header, Sider, Content,Footer } = Layout;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出登录</a>
        </Menu.Item>
    </Menu>
);
class AdminHeader extends Component{

    render() {
        const {collapsed,onToggle} = this.props
        return(
                <Header className="admin-header">
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={onToggle}
                    />
                    <div className="header-right">
                        <Dropdown overlay={menu}>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                        </Dropdown>
                    </div>
                </Header>
        )
    }
}
export default AdminHeader
