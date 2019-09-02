import React from 'react'
import Nav from './nav'
import Search from './search'
import UserInfo from './userInfo'
import HeaderLogo from './headerLogo'
import MiniNav from './miniNav'
import './index.less'
import {Layout, Row, Col, Icon, Drawer} from 'antd'

const { Header} = Layout;
const navList = [
    {
        icon: 'home',
        title: '首页',
        link: '/'
    },
    {
        icon: 'bar-chart',
        title: '归档',
        link: '/archives'
    },
    {
        icon: 'folder',
        title: '项目',
        link: '/categories'
    },
    {
        icon: 'user',
        title: '关于',
        link: '/about'
    }
];

const NathanHeader = ()=>{
    const leftFlag =          {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 1}
    const responsiveLeft =    {xxl: 2, xl: 2, lg: 3, md:3,sm: 3, xs: 4 };
    const responsiveContent = {xxl: 10, xl:11, lg: 13,md:13, sm: 12, xs: 11};
    const responsiveRight =   {xxl: 4, xl: 5, lg: 6, md:6,sm: 7, xs: 7 };
    const rightFlag =         {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 1}
    return(
        <Header className="header-contaienr">
            <Row>
                <Col {...leftFlag}/>
                <Col {...responsiveLeft}>
                    <HeaderLogo />
                </Col>
                <Col {...responsiveContent}>
                    <div className="header-content">
                        <div>
                            <MiniNav navList={navList} />
                        </div>
                        <Nav navList={navList}/>
                        <Search />
                    </div>
                </Col>
                <Col {...responsiveRight}>
                    <div className="header-right">
                        <UserInfo />
                    </div>
                </Col>
                <Col {...rightFlag}/>
            </Row>
        </Header>

    )
};
export default NathanHeader
