import React, { Component,Fragment } from 'react'
import {withRouter} from 'react-router-dom'
import { Layout,Row,Col,Tags,Pagination ,Empty} from 'antd';
import ArticleList from '@/components/web/list/list';

import Sider from '../../../components/web/sider'
import {articleList} from '@/request/request'
import {translateMarkdown,decodeQuery} from '@/lib'
import './index.less'
const rightFlag =         {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 0};
const responsiveContent = {xxl: 12, xl:13, lg: 17,md:17, sm: 22, xs: 24};
const responsiveArticle = {xxl: 4, xl: 5, lg: 5, md:5,sm: 0, xs: 0 };
const leftFlag =          {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 0};


let itemStatusMap = {};
let currentPage = 1
const pageSize = 10

const NoDataDesc = () => (
    <Fragment>
        不存在标题中含有 <span className="keyword"></span> 的文章！
    </Fragment>
);

class Home extends Component{

    state ={
        list:[],
        // total:0,
    };
    componentWillMount() {
        const query = decodeQuery(this.props.search)
        this.getArticleList(query)
    }
    componentWillReceiveProps(nextProps){
        const query = decodeQuery(nextProps.location.search)
        this.getArticleList(query)
    }
    getArticleList({page,title}){
        articleList({page:page || currentPage,pageSize,title}).then(res=>{
            const {code,data,msg} =res
            if(code === 0){
                const list = data.rows
                list.forEach(item=>{
                    item.content = translateMarkdown(item.content)
                });
                this.setState({
                    list,
                    total:data.count
                })
            }
        })
    }
    jumpTo=(id)=>{
        this.props.history.push(`/article/${id}`)
    };
    onChange=(pageNumber)=>{
        currentPage = pageNumber;
        this.getArticleList()
    };
    controlLike=(id)=>{
        // console.log(id);
    };
    render() {
        const {list,total} = this.state;
        console.log(currentPage);
        return(
            <Layout>
                <Row type='flex' justify='space-around'>
                    <Col {...leftFlag}/>
                    <Col {...responsiveContent}  className="content-inner-wrapper home">
                        <ArticleList list={list} jumpTo={(e)=> this.jumpTo(e)} isLike={(e)=>this.controlLike(e)} />
                        {list.length  > 0 ? (<Pagination showQuickJumper current={currentPage} pageSize={pageSize} total={total} onChange={this.onChange} />) : (
                            <div className="no-data">
                                <Empty description={<NoDataDesc />} />
                            </div>
                        )}
                    </Col>
                    <Col {...responsiveArticle}>
                        <Sider />
                    </Col>
                    <Col {...rightFlag}/>
                </Row>
            </Layout>
            )
        }
}

export default withRouter(Home)
