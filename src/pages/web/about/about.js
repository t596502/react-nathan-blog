import React, { Component } from 'react'
import './about.less'
// import AuthorAvatar from '@/components/web/AuthorAvatar'
import { connect } from 'react-redux'
// import { generateColorMap } from '@/redux/common/actions'

import {Row,Col, Divider, Rate, Icon } from 'antd'

const aaa = {
    xxl: {span: 12, push: 4},
    xl: {span: 13, push: 3},
    lg: {span: 17, push: 1},
    md: {span: 22, push: 1},
    sm: {span: 22, push: 1},
    xs: {span: 24},
};
// @connect(
//     null,
//     { generateColorMap }
// )
class About extends Component {
    state = { commentList: [] }

    componentDidMount() {
        // this.fetchList()
    }

    render() {
        return (
            <Row>
                <Col {...aaa} className="content-inner-wrapper about">
                    <Divider>博客简述</Divider>
                    {/* <p>主要是用来记录博主学习而作！</p> */}
                    <p>本博客使用的技术为 react + antd + koa2 + mysql</p>
                    <p>
                        源码地址为{' '}
                        <a target="_blank" rel="noreferrer noopener" href="">
                            github
                        </a>
                        ，仅供参考，不做商业用途！
                    </p>
                    <Divider>关于我</Divider>
                    <ul className="about-list">
                        <li>昵称：Nathan</li>
                        <li>学历：本科</li>
                        <li>
                            联系方式：
                            <Icon type="qq" /> 596502
                            <Divider type="vertical" />
                            <i className="iconfont icon-email" />
                            <a href="mailto:nathantai@outlook.com">nathantai@outlook.com</a>
                        </li>
                        <li>城市：深圳</li>
                        <li>
                            其他博客地址：
                            <a target="_blank" rel="noreferrer noopener" href="">
                                hexo 博客
                            </a>
                            <Divider type="vertical" />
                            <a target="_blank" rel="noreferrer noopener" href="">
                                掘金主页
                            </a>
                        </li>
                        <li>
                            个人技能
                            <ul>
                                <li>
                                    熟练掌握HTML5+CSS3按W3C标准,实现UI设计图的页面搭建
                                </li>
                                <li>
                                    熟练掌握Vue框架的运用,实现WebApp的SPA开发
                                </li>
                                <li>
                                    了解react、react-native、angular.js
                                </li>
                                <li>
                                    了解webpack可以对脚手架进行针对性的配置！
                                </li>
                                <li>
                                    node mysql：针对需求可以做到简单的数据库设计、接口的开发与设计！
                                </li>
                            </ul>
                        </li>
                        <li>
                            其他
                            <ul>
                                <li>常用开发工具： vscode、webstorm、git、svn</li>
                                <li>熟悉的 UI 工具： antd、element-ui</li>
                            </ul>
                        </li>
                        <li>
                            个人
                            <ul>
                                <li>游泳、玩游戏、看书</li>
                            </ul>
                        </li>
                    </ul>

                </Col>
            </Row>

        )
    }
}

export default About
