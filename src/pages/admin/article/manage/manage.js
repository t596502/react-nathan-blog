import React, {Component} from 'react'
import {Divider, Table, Tag, Pagination} from "antd";
import { Link, } from 'react-router-dom'
import WrappedRegistrationForm from './search'
import {articleList,categoryList} from "@/request/request";
import {decodeQuery} from '@/lib'


let currentPage = 1
const pageSize = 10
class Manage extends Component {
    state = {
        articleList:[]
    };
    componentWillMount() {
        const query = decodeQuery(this.props.search);
        this.getArticleList(query)
    }
    componentWillReceiveProps(nextProps) {
        const query = decodeQuery(nextProps.location.search);
        this.getArticleList(query)
    }

    getArticleList = ({page,title,category})=>{
        articleList({page:page || currentPage,pageSize,title,category}).then(res=>{
            const {data,code} = res
            if(code === 0){
                console.log(data);
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
            created_at:item.created_at,
            updated_at:item.updated_at,
            read_nums:item.read_nums[0].read_num,
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
            title: '评论数',
            dataIndex: 'comments',
            key:'comments',
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
                        {/* <span className="btn-edit">编辑</span> */}
                        <Link to={{ pathname: '/admin/article/edit', state: { id: record.id } }}>编辑</Link>
                        <Divider type="vertical" />
                        <span className="btn-delete" onClick={() => this.handleDelete(record.id, record.title)}>
                删除
              </span>
                    </div>
                )
            }
        }
    ];
    handleDelete =()=>{

    }
    render() {
        const {articleList,count} = this.state
        return (
            <div className='manage'>
                <WrappedRegistrationForm categoryData={categoryList} />
                <div style={{paddingTop:'10px'}}>
                    <Table
                        columns={this.getColumns()}
                        dataSource={articleList}
                        bordered
                        pagination={{total:count,current:currentPage,pageSize:pageSize}}
                    />
                </div>


            </div>
        )
    }
}

export default Manage
