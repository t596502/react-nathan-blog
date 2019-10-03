import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Icon, Layout, Avatar, Dropdown, Menu} from "antd";
import {logout} from '@/store/user/actions'
import './header.less'

const {Header} = Layout;

@connect(state => ({
        authorInfo: state.user.authorInfo,
    }),
    {logout})
@withRouter
class AdminHeader extends Component {

    logOut = () => {
        this.props.history.push('/login');
        this.props.logout()
    };
    menu = () => (
        <Menu>
            <Menu.Item>
                <span onClick={() => this.props.history.push('/')}>返回首页</span>
            </Menu.Item>
            <Menu.Item>
                <span onClick={this.logOut}>退出登录</span>
            </Menu.Item>
        </Menu>
    );

    render() {
        const {collapsed, onToggle, authorInfo} = this.props
        return (
            <Header className="admin-header">
                <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={onToggle}
                />
                <div className="header-right">
                    <Dropdown overlay={this.menu()}>
                        <Avatar src={authorInfo.avatar}/>
                    </Dropdown>
                </div>
            </Header>
        )
    }
}

export default AdminHeader
