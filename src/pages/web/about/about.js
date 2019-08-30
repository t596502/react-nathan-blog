import React, {Component} from 'react'
import './about.less'
// import AuthorAvatar from '@/components/web/AuthorAvatar'
import {connect} from 'react-redux'
// import { generateColorMap } from '@/redux/common/actions'

import {Row, Col, Divider, Alert, Icon, Descriptions} from 'antd'
import CONFIG from '@/config'

// @connect(
//     null,
//     { generateColorMap }
// )
class About extends Component {
    state = {
        userInfo: [
            {label: '昵称', content: 'Nathan', span: 1},
            {label: '学历', content: '本科', span: 1},
            {label: 'QQ', content: '596502', span: 1},
            {label: '城市', content: '深圳', span: 1},
            // {label: 'Official', content: 'Official', span: 1},
            {label: '邮箱', content: 'nathantai@outlook.com', span: 2},
            {
                label: '个人技能', children: [
                    '熟练掌握HTML5+CSS3按W3C标准,实现UI设计图的页面搭建',
                    '熟练掌握Vue框架的运用,实现WebApp的SPA开发',
                    '了解webpack可以对脚手架进行针对性的配置',
                    '了解nodeJs、koa2、express',
                    '针对需求可以做到简单的数据库设计、接口的开发与设计！'
                ],
                span:3
            },
            {
                label: '其它', children: [
                    '常用开发工具： vscode、webstorm、git、svn',
                    '熟悉的 UI 库：iview、antd、element-ui',
                ],
                span:3
            }
        ]
    }

    componentDidMount() {
        // this.fetchList()
    }

    render() {
        return (
            <Row>
                <Col {...CONFIG.LAYOUT_HOME} className="content-inner-wrapper about">
                    <Divider>关于我</Divider>
                    {/* <p>主要是用来记录博主学习而作！</p> */}
                    <Descriptions bordered border size="middle">
                        {this.state.userInfo.map(item=>(
                            <Descriptions.Item key={item.label} span={item.span} label={item.label}>{
                                item.children ? item.children.map((children,index)=>(
                                <Alert key={index} message={children} type="info" style={{marginBottom:'5px'}} />
                                )) : item.label === '邮箱' ? <a href={`mailto:${item.content}`}>{item.content}</a> : item.content
                            }</Descriptions.Item>
                        ))}
                    </Descriptions>
                    <Divider>关于博客</Divider>
                </Col>
            </Row>

        )
    }
}

export default About
