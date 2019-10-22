import {Divider, Icon,Tag,Skeleton} from "antd";
import React from "react";
import moment from 'moment'


function ArticleList(props){
        return(

            <ul className="ul-list">

                {props.list.map(item => (
                    <li key={item.id} className="ul-list-item" onClick={(e) => props.jumpTo(item.id,e)}>
                      <Skeleton loading={props.skeletonLoading}>
                        <div className='label'>
                            <span className='label-c'>分类</span>
                            <span className='label-con' onClick={(e)=>props.categoryTo(item.category[0].name,e)}>{item.category[0].name}</span>
                            <span className='label-time'>{moment(item.created_at).fromNow()}</span>
                            <div>
                                {item.tags.length && item.tags.map(item=>(
                                    <Tag
                                        onClick={(e)=>props.tagsTo(item.name,e)}
                                        className='label-tags'
                                        key={item.name}
                                        color="green">{item.name}</Tag>
                                ))}
                            </div>
                        </div>
                        <Divider orientation="left">
                            <span className="title">{item.title}</span>
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
                                <span className="nums">{item.read_nums}</span>
                            </div>
                            <div className='list-item-action'>
                                <Icon className='icon-like' theme='outlined' type="message" style={{ marginRight: 5 }} />
                                <span className="nums">{item.comment_nums}</span>
                            </div>
                        </div>
                   </Skeleton>
                    </li>
                ))}
            </ul>
        )
    // }


}
export default ArticleList
