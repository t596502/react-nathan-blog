import React, {Component} from 'react'
import {connect} from "react-redux";
import {Row, Col, Typography, Icon, message, BackTop,Tag,Divider} from 'antd';

import Comment from './comment/comment'
import Navigation from './navigation'
import {openAuthModal} from '@/store/common/actions'
import * as api from "@/request/request";
import {translateMarkdown} from "@/lib";
import CONFIG from '@/config'
import './article.less';
const { Title } = Typography;



@connect(
    state => state => state.user,
    {openAuthModal}
)
class Article extends Component {
    state = {
        detail: {},
        likeStatus:false,
        targetOffset:10
    };

    componentWillMount() {
        const id = this.props.match.params.id
        this.getArticleDetail(id)
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
                data.contentLength = data.content.length
                data.category = data.category[0].name
                this.setState({
                    detail: data
                })
            }else {
                message.error(msg)
            }
        })
    }
    isLogin =() =>{
        if (!this.props.username) {
            this.props.openAuthModal('login')
            return false
        }else {
            return true
        }
    };
    isLike= id =>{
        if(!this.isLogin()) return;
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
    categoryTo=(category)=>{
        this.props.history.push(`/?page=1&category=${category}`)
    };
    tagsToList=(tag,e)=>{
        this.props.history.push(`/?page=1&tag=${tag}`)
    };
    updateLength=(length)=>{
        console.log(length);
        this.setState(state =>{
            state.detail['comment_nums'] = length
            return{
                "detail['comment_nums']":length
            }
        })
    };
    render() {
        const {detail,likeStatus} = this.state;
        const {username}= this.props;
        return (
            <div className="article">
                <Row >
                    <Col {...CONFIG.LAYOUT_HOME}>{detail.id &&(
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
                                            <span style={{marginRight:'8px'}}>喜欢 {detail.favor_nums}</span>
                                            <span>评论 {detail.comment_nums}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <Icon type="tags" />
                                            {detail.tags.length && detail.tags.map((item)=>(
                                                <div key={item.name} style={{display:'inline-block'}}>
                                                    <Divider type="vertical" />
                                                    <Tag
                                                        onClick={(e)=>this.tagsToList(item.name,e)}
                                                        style={{marginRight:'0'}}
                                                        color="green">{item.name}</Tag>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <Icon type="folder" />
                                            <Divider type="vertical" />
                                            <Tag
                                                onClick={()=>{this.categoryTo(detail.category)}}
                                                style={{marginRight:'0'}}
                                                key={detail.category}
                                                color="#108ee9">{detail.category}</Tag>
                                        </div>
                                    </div>
                                </div>

                            </header>

                            <div className="article-detail" dangerouslySetInnerHTML={{__html: detail.content}}/>

                            <div className='like-wrapper'>
                                <div className={['article-like',likeStatus && 'flag'].join(' ')}
                                     onClick={()=>this.isLike(detail.id)}>
                                    <Icon type='like'
                                          style={{fontSize:'30px',color:likeStatus ? '#fff' :'#969696'}}
                                          theme={'outlined'} />
                                </div>
                                <span style={{marginLeft:'5px'}}>赞（{detail.favor_nums}）</span>
                            </div>

                        </div>)}
                    </Col>
                    <div span={4} push={4} className='right-navigation'>
                        <Navigation content={detail.content} />
                    </div>
                </Row>
                <Row>
                    <Col {...CONFIG.LAYOUT_HOME}>
                        <div className="article-comments">
                            <section className="comments">
                                <Title className='title' level={4} type='secondary'>评论</Title>
                                <Comment articleId={detail.id} updateLength={this.updateLength} commentsLength={detail.comment_nums || 0} />
                            </section>
                        </div>
                    </Col>
                </Row>
                <BackTop />
            </div>

        )
    }
}

export default Article
