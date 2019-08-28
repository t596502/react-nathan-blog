import React from 'react'
import Nav from './nav'
import Search from './search'
import UserInfo from './userInfo'
import HeaderLogo from './headerLogo'
import './index.less'
import { Layout, Row, Col ,Icon} from 'antd'
const { Header} = Layout;
const navList = [
    {
        icon: 'home',
        title: '首页',
        link: '/'
    },
    {
        icon: 'snippets',
        title: '文章',
        link: '/archives'
    },
    {
        icon: 'folder',
        title: '分类',
        link: '/categories'
    },
    {
        icon: 'user',
        title: '关于',
        link: '/about'
    }
]

const NathanHeader = ()=>{
    const leftFlag =          {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 0}
    const responsiveLeft =    {xxl: 2, xl: 2, lg: 3, md:3,sm: 4, xs: 24 };
    const responsiveContent = {xxl: 10, xl:11, lg: 13,md:13, sm: 18, xs: 0};
    const responsiveRight =   {xxl: 4, xl: 5, lg: 6, md:6,sm: 0, xs: 0 };
    const rightFlag =         {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 0}
    return(
        <Header className="header-contaienr">
            <Row>
                <Col {...leftFlag}/>
                <Col {...responsiveLeft}>
                    <HeaderLogo  navList={navList}/>
                </Col>
                <Col {...responsiveContent}>
                    <div className="header-content">
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
