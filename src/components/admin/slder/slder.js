import React, {Component} from 'react'
import {Icon, Menu} from "antd";
import {Link} from "react-router-dom";

const {SubMenu} = Menu


class SideBarNav extends Component {
    render() {
        return (
            <div className="logo" style={{height: '100vh'}}>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                        <Icon type="user"/>
                        <span className="nav-text">
                            <Link to='/admin'>首页</Link>
                        </span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={
                        <span><Icon type="mail"/><span>文章管理</span></span>
                    }>
                        <Menu.Item key="child1">
                            <Link to='/admin/addArticle'>新增文章</Link>
                        </Menu.Item>
                        <Menu.Item key="child2">
                            <Link to='/admin/manage'>文章列表</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="3">
                        <Icon type="upload"/>
                        <span className="nav-text">用户管理</span>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default SideBarNav
