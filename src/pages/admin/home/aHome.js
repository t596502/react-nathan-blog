import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import SideBarNav from '../../../components/admin/slder/slder'
import AdminHeader from '../../../components/admin/header/header'
import AddArticle from '../article/edit/edit'
import Manage from '../article/manage/manage'
import SettingUp from '../user/settingUp/settingUp'
import './aHome.less'
import { Layout, Menu, Icon } from 'antd';

const { Sider, Content,Footer } = Layout;

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
                            <Switch>
                                <Route path='/admin/article/edit' exact component={AddArticle} />
                                <Route path='/admin/article/manage' exact component={Manage} />
                                <Route path='/admin/user/settingUp' exact component={SettingUp} />
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by nathantai@outlook.com</Footer>
                    </Layout>
                </Layout>
            </div>

        );
    }
}

export default aHome
