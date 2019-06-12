import React, {Component} from 'react'
import {Divider,Table,Row} from "antd";
import { Link, } from 'react-router-dom'
import {WrappedRegistrationForm} from './search'
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

class Manage extends Component {
    getColumns = ()=> [
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '标签',
            dataIndex: 'tags',
        },
        {
            title: 'tags',
            dataIndex: '',
        },
        {
            title:'分类',
            dataIndex: 'categories',
        },
        {
            title: '评论数',
            dataIndex: 'comments',
        },
        {
            title: '发布时间',
            dataIndex: 'createdAt',
        },
        {
            title: '修改时间',
            dataIndex: 'updatedAt',

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
        return (
            <div className='manage'>
                <WrappedRegistrationForm />
                <div style={{paddingTop:'10px'}}>
                    <Table
                        columns={this.getColumns()}
                        dataSource={data}
                        bordered
                    />
                </div>


            </div>
        )
    }
}

export default Manage
