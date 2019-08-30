import React, {Component} from 'react'
import './archives.less'
import {Link} from "react-router-dom";
import {Row, Col, Timeline, Icon, message,Alert} from 'antd'
import CONFIG from '@/config'
import * as api from "@/request/request";

class Archives extends Component {
    state = {
        list:[]
    };

    componentDidMount() {
        this.getArchiveList()
    }
    getArchiveList(){
        api.archiveList().then(res => {
            const {code, msg, data} = res;
            console.log(data);
            if (code === 0) {
                this.setState({
                    list:data
                })
            }else {
                message.error(msg)
            }

        })
    }
    //{item.created_at} {item.title}
    render() {
        const {list} = this.state
        return (
            <Row>
                <Col {...CONFIG.LAYOUT_HOME} className="content-inner-wrapper archives">
                    <Timeline>
                        <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '20px' }} />} color="red">
                            <h1 style={{fontSize:'2rem',marginLeft:'0.5rem',position: 'relative',top:' -12px'}}>2019</h1>
                        </Timeline.Item>
                        {list.length ? list.map(item=>(
                            <Timeline.Item color='#91d5ff' key={item.id}>
                                <Link to={`/article/${item.id}`}>
                                    <Alert message={item.title} description={item.created_at.substr(5,5)} type="info"/>
                                </Link>
                            </Timeline.Item>
                        )):''}

                    </Timeline>
                </Col>
            </Row>

        )
    }
}

export default Archives
