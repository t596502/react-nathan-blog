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
            title: '用户名',
            dataIndex: 'title',
            key:'title'
        },
        {
            title:'邮箱',
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
            title: '评论数',
            dataIndex: 'comment_nums',
            key:'comment_nums',
        },
        {
            title: '创建时间',
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
                        <Link to={`/article/${record.id}`}>修改密码</Link>
                    </div>
                )
            }
        }
    ];
    pageChange =(page)=>{
        currentPage = page;
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
