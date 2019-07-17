import React, {Component} from 'react'
import {Divider, Table, Tag, Pagination} from "antd";
import { Link, } from 'react-router-dom'
import {WrappedRegistrationForm} from './search'
import {articleList} from "@/request/request";

const data = [
    {
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
    },
];
let page = 1
const pageSize = 10
class Manage extends Component {
    state = {
        articleList:[]
    };
    componentWillMount() {
        this.getArticleList()
    }
    getArticleList = ()=>{
        articleList().then(res=>{
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
            read_nums:item.read_nums[0].read_num
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
                        <Link to={{ pathname: '/admin/articles/edit', state: { articleId: record.id } }}>编辑</Link>
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
                <WrappedRegistrationForm />
                <div style={{paddingTop:'10px'}}>
                    <Table
                        columns={this.getColumns()}
                        dataSource={articleList}
                        bordered
                        pagination={{total:count,current:page,pageSize:pageSize}}
                    />
                </div>


            </div>
        )
    }
}

export default Manage
