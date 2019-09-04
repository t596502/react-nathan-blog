import React, {Component} from 'react'
import {Divider, Table, Tag, message, Modal} from "antd";
import { Link, } from 'react-router-dom'
import WrappedRegistrationForm from './search'
import * as api from "@/request/request";
import {decodeQuery} from '@/lib'


let currentPage = 1
const pageSize = 10
class Manage extends Component {
    state = {
        articleList:[]
    };
    componentWillMount() {
        this.query = decodeQuery(this.props.search);
        this.getArticleList(this.query)
    }
    componentWillReceiveProps(nextProps) {
        this.query = decodeQuery(nextProps.location.search);
        this.getArticleList(this.query)
    }

    getArticleList = ({page = currentPage,title,category,tag})=>{
        api.articleList({page:page,pageSize,title,category,tag}).then(res=>{
            const {data,code} = res;
            if(code === 0){
                this.setState({
                    articleList:this.filterData(data.rows),
                    total:data.count
                })
            }
        })
    };

    filterData=(data)=>{
        data = data.map(item=>({
            title:item.title,
            category:item.category,
            tags:item.tags,
            created_at:item.created_at,
            updated_at:item.updated_at,
            read_nums:item.read_nums,
            comment_nums:item.comment_nums,
            key:item.id,
            id:item.id
        }));
        return data
    }

    getColumns = ()=> [
        {
            title: '标题',
            dataIndex: 'title',
            key:'title'
        },
        {
            title:'分类',
            dataIndex: 'category',
            key:'category',
            render: (text, record) => {

                return (
                    <div>
                        {record.category.map((item,index)=>(
                            <Tag color="#87d068" key={index}>{item.name}</Tag>
                        ))}
                    </div>
                )
            }
        },
        {
            title:'标签',
            dataIndex: 'tags',
            key:'tags',
            render: (text, record) => {

                return (
                    <div>
                        {record.tags.map((item,index)=>(
                            <Tag color="red" key={index}>{item.name}</Tag>
                        ))}
                    </div>
                )
            }
        },
        {
            title: '评论数',
            dataIndex: 'comment_nums',
            key:'comment_nums',
        },
        {
            title: '浏览数',
            dataIndex: 'read_nums',
            key:'read_nums',
        },
        {
            title: '发布时间',
            dataIndex: 'created_at',
            key:'created_at',
        },
        {
            title: '修改时间',
            dataIndex: 'updated_at',
            key:'updated_at',

        },
        {
            title: '操作',
            render: (text, record) => {
                return (
                    <div className="action">
                        <Link to={`/article/${record.id}`}>查看</Link>
                        <Divider type="vertical" />
                        <Link to={{ pathname: '/admin/article/edit', state: { id: record.id } }}>编辑</Link>
                        <Divider type="vertical" />
                        <span className="btn-delete" onClick={() => this.handleDelete(record.id, record.title)}>删除</span>
                    </div>
                )
            }
        }
    ];
    handleDelete =(articleId,title)=>{
        Modal.confirm({
            title: '温馨提示！',
            content: `是否删除${title}?`,
            okText: '确认',
            cancelText: '取消',
            onOk:()=>{
                const params = {
                    id:articleId
                };
                console.log('articleId',articleId);
                api.articleDelete(params).then(res=>{
                    const {code,msg} = res
                    if(code === 0){
                        message.warning(`成功删除${title}`);
                        console.log(this.query);
                        this.getArticleList(this.query)
                    }else {
                        message.error(msg);
                    }
                })
            }
        });
    };
    pageChange =(page)=>{
        currentPage = page
        this.getArticleList({})

    }
    render() {
        const {articleList,total} = this.state
        return (
            <div className='manage'>
                <WrappedRegistrationForm />
                <div style={{paddingTop:'10px'}}>
                    <Table
                        columns={this.getColumns()}
                        dataSource={articleList}
                        bordered
                        pagination={{total:total,current:currentPage,pageSize:pageSize,onChange:(page)=>this.pageChange(page)}}
                    />
                </div>


            </div>
        )
    }
}

export default Manage
