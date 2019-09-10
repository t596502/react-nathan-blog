import React, {Component} from 'react'
import * as api from '@/request/request'
import './about.less'

import {Row, Col, Divider, Alert, Descriptions} from 'antd'
import CONFIG from '@/config'
import {connect} from "react-redux";

@connect(
    state=>({
        authorInfo:state.user.authorInfo
    }),
    null
)
class About extends Component {
    state = {
        userInfo: [

        ]
    }

    componentDidMount() {
        // this.fetchList()
        console.log(this.props.authorInfo.nickname);
        const {nickname,education,email,city,contact,skill,other} = this.props.authorInfo
        const skillArr = skill.split('|');
        const otherArr = other.split('|');
        this.setState({
            userInfo:[
                {label: '昵称', content: nickname, span: 1},
                {label: '学历', content: education, span: 1},
                {label: 'QQ', content: contact, span: 1},
                {label: '城市', content: city, span: 1},
                // {label: 'Official', content: 'Official', span: 1},
                {label: '邮箱', content: email, span: 2},
                {
                    label: '个人技能', children: skillArr,
                    span:3
                },
                {
                    label: '其它', children: otherArr,
                    span:3
                }
            ]
        })
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
