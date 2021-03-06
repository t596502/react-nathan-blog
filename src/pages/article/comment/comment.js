import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import AuthorAvatar from '@/components/authorAvatar/authorAvatar'

import {Comment, Avatar, Form, Button, Input, message} from 'antd';
import moment from 'moment';
import {openAuthModal,generateColorMap} from '@/store/common/actions'
import * as api from "@/request/request";
import {translateMarkdown} from "@/lib";
import './comment.less'

const {TextArea} = Input;
const COMMENT = 'comment', REPLY = 'reply'
const REPLY_STYLE1={width:'100%',display:'block',color:'#1890ff'}
const REPLY_STYLE2={color: '#1890ff', fontSize: '1rem', margin: '0 3px'}

const CommentList = ({children, comments, openReply, commentsId, replyChange, replyContent, replySubmit, replyId, renderAvatar}) => {
    function handleClick() {
        if (comments.type === 'comment') openReply(comments.type, comments.id)
        else openReply(comments.type, comments.commentId, comments.replyId)
    }
    const content = translateMarkdown(comments.content).replace(/\sonclick=(.*)">/g,'>') // 阻止点击事件！！！

    return (
        <Comment
            key={comments.id || comments.replyId}
            actions={[<span style={REPLY_STYLE1} onClick={() => handleClick()}>回复</span>]}
            author={<div style={{fontSize: '0.9rem'}}>
                {comments.parentAuthor ? (
                    <div>
                        <span>{comments.author}</span>
                        <span style={REPLY_STYLE2}>@</span>
                        <span>{comments.parentAuthor}</span>
                    </div>
                ) : <span>{comments.author}</span>}
            </div>}
            avatar={renderAvatar(comments)
                // <Avatar style={{ backgroundColor: '#87d068' }}>{comments.author}</Avatar>
            }
            content={
                <p className="article-detail"
                    dangerouslySetInnerHTML={{ __html: content }} />
            }
            datetime={<span>{comments.datetime}</span>}
        >

            {((commentsId === comments.id && comments.type === 'comment') || (replyId === comments.replyId && comments.type === 'reply')) &&
            <div className="reply-form">
                <TextArea autosize value={replyContent} onChange={replyChange} placeholder={`回复${comments.author}...`}/>
                <div className="reply-form-controls">
                    <span className="tip">支持 Markdown 语法</span>
                    <Button onClick={replySubmit} disabled={!replyContent.length} htmlType="submit" type="primary">
                        评论
                    </Button>
                </div>
            </div>}
            {children}
        </Comment>
    )
};

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <div>
        <Form.Item>
            <TextArea placeholder="写下你的评论..." rows={3} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <div className='comments-submit'>
                <span className="tip">支持 Markdown 语法</span>
                <Button htmlType="submit" disabled={value.length === 0} loading={submitting} onClick={onSubmit}
                        type="primary">
                    提交
                </Button>
            </div>
        </Form.Item>
    </div>
);

@withRouter
@connect(state => ({
        username: state.user.username,
        colorMap: state.common.colorMap
    }),
    {openAuthModal,generateColorMap}
)
class NathanComment extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
        commentsId: '',
        replyId: '',
        replyContent: '',
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.articleId !== nextProps.articleId) {
            this.articleId = nextProps.articleId;
            this.getComments(this.articleId,false,true)
        }
    }

    componentWillMount() {

    }

    renderAvatar = item => {
        const {colorMap} = this.props;
        const author = item.author || item
        if(author === 'nathan'){
            return(
                <AuthorAvatar />
            )
        }else if(author) {
            return(
                <Avatar
                    className="user-avatar"
                    size="default"
                    style={{backgroundColor: colorMap[author] || '#ccc'}}>
                    {author}
                </Avatar>
            )
        }
    }
    replyChange = (e) => {
        this.setState({replyContent: e.target.value})
    };
    replyKeyUp = (e) => {
        if (e.ctrlKey && e.keyCode === 13) {
            this.replySubmit()
        }
    };
    openReply = (type, commentsId, replyId) => {
        if(!this.isLogin()) return;
        if (type === 'comment') {
            this.setState({
                commentsId,
                replyId: '',
            })
        } else {
            this.commentsId = commentsId
            this.setState({
                replyId,
                commentsId: '',
            })
        }

    };

    filterComments(data) {
        return data.map(item => ({
            id: item.id,
            type: COMMENT,
            author: item.comment_username || '',
            content: item.content,
            datetime: moment(item.created_at).fromNow(),
            replyList: item.replyList.length ? item.replyList.map(item => ({
                commentId: item.comment_id,
                replyId: item.reply_id,
                type: REPLY,
                author: item.reply_username || '',
                parentAuthor: item.reply_parent_username,
                content: item.reply_content,
                datetime: moment(item.reply_created_at).fromNow(),
            })) : []
        }))
    }

    getComments(id,isUpdateLength =false,setAuthorColor) {

        api.commentsList({article_id: id}).then(res => {
            const {data, code, msg} = res;
            if (code === 0) {
                let comments = this.filterComments(data);
                if(setAuthorColor) this.props.generateColorMap(comments)
                let comTotal = 0;
                if(comments.length && isUpdateLength){
                    comments.forEach(item=>{
                        if(item.replyList.length){
                            comTotal += item.replyList.length
                        }
                    })
                    comTotal += comments.length
                    this.props.updateLength(comTotal)
                }
                // this.setState({
                //     comments: comments
                // })
                this.setState({
                    comments
                })

            }else {
                console.log(msg);
            }

        })
    }

    replySubmit = () => {

        const {commentsId, replyContent, replyId} = this.state;
        const params = {
            parent_id: replyId || '0',
            content: replyContent,
            article_id: this.articleId,
            comment_id: commentsId || this.commentsId
        };
        api.replyCommentsAdd(params).then(res => {
            const {code, msg} = res;
            if (code === 0) {
                this.setState({
                    replyContent: '',
                    commentsId: '',
                    replyId: ''
                });
                this.getComments(this.articleId,true);
                message.success('回复成功！')
            } else {
                message.error(msg)
            }
        })
    };
    isLogin =() =>{
        if (!this.props.username) {
            this.props.openAuthModal('login')
            return false
        }else {
            return true
        }
    };
    handleSubmit = () => {
        if(!this.isLogin()) return;
        this.setState({
            submitting: true,
        });
        let params = {
            article_id: this.articleId,
            content: this.state.value
        };
        api.commentsAdd(params).then(res => {
            const {code, msg: errorMsg} = res
            if (code === 0) {
                this.setState({
                    submitting: false,
                    value: ''
                });
                this.updateComment = true
                message.success('评论成功！')
                this.getComments(this.articleId,true)
            } else {
                this.setState({
                    submitting: false,
                });
                message.error(errorMsg)
            }
        });
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {comments, submitting, value, commentsId, replyContent, replyId,} = this.state;
        const commonProps = {
            replyContent,
            openReply: this.openReply,
            replyChange: this.replyChange,
            replyKeyUp: this.replyKeyUp,
            replySubmit: this.replySubmit,
            renderAvatar: this.renderAvatar,
        };
        return (
            <div className="wrapper">
                <Comment
                    avatar={this.renderAvatar(this.props.username)}
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
                <span className="comments-length">{`${this.props.commentsLength} ${this.props.commentsLength > 0 ? '条评论' : 'reply'}`}</span>
                {comments.length > 0 &&
                comments.map((item, index) => (
                    <CommentList commentsId={commentsId} comments={item} key={index} {...commonProps}>
                        {item.replyList.map((child, index) => (
                            <CommentList replyId={replyId} comments={child} key={index} {...commonProps} />
                        ))}
                    </CommentList>
                ))}
            </div>
        );
    }
}

export default NathanComment
