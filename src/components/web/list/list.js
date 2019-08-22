import {Divider, Icon} from "antd";
import React,{Component} from "react";
import moment from 'moment'


class ArticleList extends Component{

    render() {
        const {list} = this.props;
        return(
            <ul className="ul-list">
                {list.map(item => (
                    <li key={item.id} className="ul-list-item">
                        <div className='label'>
                            <span className='label-c'>分类</span>
                            <span className='label-con'>{item.category[0].name}</span>
                            <span className='label-time'>{moment(item.created_at).fromNow()}</span>
                        </div>
                        <Divider orientation="left">
                            <span className="title" onClick={() => this.props.jumpTo(item.id)}>{item.title}</span>
                        </Divider>
                        <div className='article-bottom'>
                            {/*
                            <div onClick={()=>this.props.isLike(item.id)} className="list-item-action">
                                <Icon className='icon-like' theme='filled' type="like" style={{ marginRight: 5 }} />
                                <span className="like-nums">{item.favor_nums}</span>
                            </div>*/}
                            <div className='list-item-action'>
                                <Icon className='icon-like' theme='outlined' type="like" style={{ marginRight: 5 }} />
                                <span className="nums">{item.favor_nums}</span>
                            </div>
                            <div className='list-item-action'>
                                <Icon className='icon-like' theme='outlined' type="eye" style={{ marginRight: 5 }} />
                                <span className="nums">{item.read_nums[0].read_num}</span>
                            </div>
                            <div className='list-item-action'>
                                <Icon className='icon-like' theme='outlined' type="message" style={{ marginRight: 5 }} />
                                <span className="nums">{item.comment_nums}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }


}
export default ArticleList
