import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'
import SideBarNav from '../../../components/admin/slder/slder'
import AdminHeader from '../../../components/admin/header/header'
import AddArticle from '../article/edit/edit'
import Manage from '../article/manage/manage'
import './aHome.less'
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content,Footer } = Layout;

class aHome extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <div className='admin-container'>
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsed={this.state.collapsed}
                    >
                        <SideBarNav />
                    </Sider>
                    <Layout>
                        <AdminHeader collapsed={this.state.collapsed} onToggle={this.toggle}/>
                        <Content style={{ margin: '24px 16px 0',background:'#fff' }}>
                                <Route path='/admin/addArticle' component={AddArticle} />
                                <Route path='/admin/manage' component={Manage} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by nathantai@outlook.com</Footer>
                    </Layout>
                </Layout>
            </div>

        );
    }
}

export default aHome
