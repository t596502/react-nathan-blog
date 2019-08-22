import React, {Component} from 'react'
import {connect} from "react-redux";
import {Row, Col, Typography, Icon, message, Avatar} from 'antd';
import * as api from "@/request/request";
import {translateMarkdown} from "@/lib";
import Comment from './comment/comment'
import './article.less';
const { Title, Paragraph,  } = Typography;


const aaa = {
    xxl: {span: 12, push: 4},
    xl: {span: 13, push: 3},
    lg: {span: 17, push: 1},
    md: {span: 17, push: 1},
    sm: {span: 22, push: 1},
    xs: {span: 24},
};
@connect(
    state => state => state.user,
    null
)
class Article extends Component {
    state = {
        detail: {},
        likeStatus:false
    };

    componentWillMount() {
        const id = this.props.match.params.id
        this.getArticleDetail(id)
        console.log(this.props.username);
        if(this.props.username){
            this.getArticleLikeStatus(id)
        }
    }
    getArticleLikeStatus(id) {
        api.articleLikeStatus({article_id:id}).then(res => {
            const {code, msg, data} = res;
            if (code === 0) {
                this.setState({
                    likeStatus:data.like_status
                })
            }else {
                message.error(msg)
            }

        })
    }
    getArticleDetail(id) {
        api.articleDetail({id}).then(res => {
            const {code, msg, data} = res;
            if (code === 0) {
                data.content = translateMarkdown(data.content);
                data.read_nums = data.read_nums ? data.read_nums[0].read_num : 1;
                data.contentLength = data.content.length
                this.setState({
                    detail: data
                })
            }else {
                message.error(msg)
            }
        })
    }
    isLike= id =>{
        let {likeStatus,detail} = this.state;
        const apiName = likeStatus ? 'articleDislike' : 'articleLike';
        const succMsg = likeStatus ? '取消点赞成功' : '点赞成功';
        // const
        api[apiName]({article_id:id}).then(res=>{
            const {code, msg:errorMsg} = res;
            if (code === 0) {
                 detail.favor_nums = likeStatus ? --detail.favor_nums : ++detail.favor_nums
                this.setState({
                    detail
                });
                this.getArticleLikeStatus(id);
                message.success(succMsg)
            }else {
                message.error(errorMsg)
            }
        })
    };
    render() {
        const {detail,likeStatus} = this.state;
        const {username}= this.props;
        const classname = {
            'article-like':true,
            'flag':likeStatus
        }
        return (
            <div className="article">
                <Row >
                    <Col {...aaa}>{detail.id &&(
                        <div className="article-wrapper">
                            <header className="title">
                                <Title >{detail.title}</Title>
                                <div className="title-header">
                                    {/*<Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{username}</Avatar>*/}
                                    <div className="article-info">
                                        <div>
                                            <span>{detail.updated_at}</span>
                                        </div>
                                        <div>
                                            <span>字数 {detail.contentLength}</span>
                                            <span style={{margin:'0 8px'}}>阅读 {detail.read_nums}</span>
                                            <span>喜欢 {detail.favor_nums}</span>
                                        </div>
                                    </div>
                                </div>

                            </header>
                            <div className="article-detail" dangerouslySetInnerHTML={{__html: detail.content}}/>
                            <div className='like-wrapper'>
                                <div className={['article-like',likeStatus && 'flag'].join(' ')}
                                     onClick={(e)=>this.isLike(detail.id)}>
                                    <Icon type='like'
                                          style={{fontSize:'30px',color:likeStatus ? '#fff' :'#969696'}}
                                          theme={'outlined'} />
                                </div>
                                <span style={{marginLeft:'5px'}}>赞（{detail.favor_nums}）</span>
                            </div>

                        </div>)}
                    </Col>
                    {/*<Col>dsadsa</Col>*/}
                </Row>
                <Row>
                    <Col {...aaa}>
                        <div className="article-comments">
                            <section className="comments">
                                <Title className='title' level={4} type='secondary'>评论</Title>
                                <Comment articleId={detail.id}/>
                            </section>
                        </div>
                    </Col>
                </Row>
            </div>

        )
    }
}

export default Article
