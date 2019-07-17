import React, {Component} from 'react'
import {Row, Col,Typography} from 'antd';
import {articleDetail} from "@/request/request";
import {translateMarkdown} from "@/lib";
import './article.less';
const { Title, Paragraph, Text } = Typography;


const aaa = {
    xxl: {span: 12, push: 4},
    xl: {span: 13, push: 3},
    lg: {span: 17, push: 1},
    md: {span: 17, push: 1},
    sm: {span: 22, push: 1},
    xs: {span: 24},
}

class Article extends Component {
    state = {
        detail: {}
    };

    componentWillMount() {
        const id = this.props.match.params.id
        this.getArticleDetail(id)
    }

    getArticleDetail(id) {
        articleDetail({id}).then(res => {
            const {code, msg, data} = res;
            if (code === 0) {
                data.content = translateMarkdown(data.content);
                this.setState({
                    detail: data
                })
            }
        })
    }

    render() {
        const {detail} = this.state
        return (
            <div className="article">
                <Row>
                    <Col {...aaa}>
                        <div className="article-wrapper">
                            <header className="title">
                                <Title >{detail.title}</Title>
                                <Paragraph className="time">『{detail.updated_at}』</Paragraph>
                            </header>

                            <div className="article-detail" dangerouslySetInnerHTML={{__html: detail.content}}/>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </div>

        )
    }
}

export default Article
