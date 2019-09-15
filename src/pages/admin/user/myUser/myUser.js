import React, {Component} from 'react'
import {Table, Tag, message} from "antd";
import { Link, } from 'react-router-dom'
import * as api from "@/request/request";
import {decodeQuery} from '@/lib'


let currentPage = 1
const pageSize = 10
class myUser extends Component {
    state = {
        userList:[]
    };
    componentWillMount() {
        this.getArticleList()
    }


    getArticleList = ()=>{
        api.userList({page:currentPage,pageSize}).then(res=>{
            const {data,code} = res;
            if(code === 0){
                this.setState({
                    userList:data.rows,
                    total:data.count
                })
            }
        })
    };

    getColumns = ()=> [
        {
            title: '用户名',
            dataIndex: 'username',
            key:'username'
        },
        {
            title:'邮箱',
            dataIndex: 'email',
            key:'email'
        },
        // {
        //     title: '评论数',
        //     dataIndex: 'comment_nums',
        //     key:'comment_nums',
        // },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            key:'created_at',
        }
    ];
    pageChange =(page)=>{
        currentPage = page;
        this.getArticleList({})

    }
    render() {
        const {userList,total} = this.state
        return (
            <div className='manage'>
                <div style={{paddingTop:'10px'}}>
                    <Table
                        columns={this.getColumns()}
                        dataSource={userList}
                        bordered
                        pagination={{total:total,current:currentPage,pageSize:pageSize,onChange:(page)=>this.pageChange(page)}}
                    />
                </div>


            </div>
        )
    }
}

export default myUser
