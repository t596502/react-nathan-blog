import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {Comment, Avatar, Form, Button, List, Input, message} from 'antd';
import moment from 'moment';
import * as api from "@/request/request";
import './comment.less'
const { TextArea } = Input;

// const CommentList = ({ comments }) => (
//     <List
//         dataSource={comments}
//         header={`${comments.length} ${comments.length > 1 ? '条评论' : 'reply'}`}
//         itemLayout="horizontal"
//         renderItem={props => <Comment {...props} />}
//     />
// );
const CommentList = ({ comments,children }) => {
    let rep = false
    function reply() {
        rep = true
    }
    return (
    <Comment
        key={comments.id}
        actions={[<span onClick={()=>reply()}>回复</span>]}
        author={<a>{comments.author}</a>}
        avatar={
            <Avatar
                src={comments.avatar}
                alt="Han Solo"
            />
        }
        content={
            <p>{comments.content}</p>
        }
        datetime={<span>{comments.created_at}</span>}
    >
        {rep && (
            <div className="reply-form">
                <TextArea placeholder={`回复`}/>
                <div className="reply-form-controls">
                    <span className="tip">Ctrl or ⌘ + Enter</span>
                    <Button htmlType="submit" type="primary">
                        回复
                    </Button>
                </div>
            </div>
        )}
        {children}
    </Comment>
)};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea placeholder="写下你的评论..." rows={3} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" disabled={value.length === 0} loading={submitting} onClick={onSubmit} type="primary">
                提交
            </Button>
        </Form.Item>
    </div>
);
@withRouter
class NathanComment extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
    };
    componentWillReceiveProps(nextProps) {
        if(this.props.articleId !== nextProps.articleId){
            this.articleId = nextProps.articleId
            this.getComments(this.articleId)
        }
    }
    componentWillMount() {

    }
    reply = (commentId)=>{

    };
    getComments(id){
        api.commentsList({article_id: id}).then(res=>{
            const {data,code,msg}=res;
            if(code === 0){
                let comments = data.map(item=>({
                    // actions:[],
                    author : item.username,
                    content : item.content,
                    datetime :  moment().fromNow(item.created_at),
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    // id:
                }));
                this.setState({
                    comments:comments
                })
            }else {

            }

        })
    }
    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });
        let params = {
            article_id:this.articleId,
            content: this.state.value
        };
        api.commentsAdd(params).then(res=>{
            const {data,code,msg:errorMsg} = res
            if(code === 0){
                this.setState({
                    submitting: false,
                    value: '',
                    comments: [
                        {
                            actions: [<span >回复</span>],
                            author: 'Han Solo',
                            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                            content: <p>{this.state.value}</p>,
                            datetime: moment().fromNow(),
                        },
                        ...this.state.comments,
                    ],
                });
            }else {
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
        const { comments, submitting, value } = this.state;

        return (
            <div className="wrapper">
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
                <span className="comments-length">{`${comments.length} ${comments.length > 0 ? '条评论' : 'reply'}`}</span>
                {comments.length > 0 &&
                comments.map((item,index) =>(
                    <CommentList comments={item} key={index} />
                )) }
            </div>
        );
    }
}

export default NathanComment
