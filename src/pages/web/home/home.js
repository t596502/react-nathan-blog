import React, { Component,Fragment } from 'react'
import {withRouter} from 'react-router-dom'
import { Layout,Row,Col,Tags ,Spin} from 'antd';
import ArticleList from '@/components/web/list/list';
import InfiniteScroll from 'react-infinite-scroller'
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
const pageSize = 8

const NoDataDesc = () => (
    <Fragment>
        不存在标题中含有 <span className="keyword"></span> 的文章！
    </Fragment>
);

class Home extends Component{

    state ={
        list:[],
        // total:0,
        hotList:[],
        loading:false,
        hasMore: true,
    };
    currentPage = 1
    componentWillMount() {
        const query = decodeQuery(this.props.search)
        console.log(query);
        this.getArticleList(query)
        this.getHotArticleList()
    }
    componentWillReceiveProps(nextProps){
        const query = decodeQuery(nextProps.location.search)
        this.getArticleList(query)
    }
    getArticleList({page,title},isMore){
        articleList({page:page || this.currentPage,pageSize,title}).then(res=>{
            setTimeout(()=>{
                if(isMore){
                    this.setState({
                        loading:false
                    });
                }
            },2000)

            const {code,data,msg} =res
            if(code === 0){
                const list = data.rows;
                this.setState({
                    hasMore:list.length === pageSize
                });
                if(this.state.list.length){
                    this.setState({
                        list:this.state.list.concat(list)
                    })
                }else {
                    this.setState({
                        list,
                        total:data.count
                    });
                }
                ++this.currentPage
            }
        })
    }
    getHotArticleList(){
        articleList({is_hot:1}).then(res=>{
            const {code,data,msg} =res
            if(code === 0){
                const hotList = data.rows;
                hotList.map(item=>({
                    id:item.id,
                    title:item.title
                }));
                this.setState({
                    hotList,
                })
            }
        })
    }
    jumpTo=(id)=>{
        this.props.history.push(`/article/${id}`)
    };
    onChange=(pageNumber)=>{
        this.currentPage = pageNumber;
        this.getArticleList()
    };
    controlLike=(id)=>{
        // console.log(id);
    };
    handleInfiniteOnLoad=()=>{
        console.log(222);
        if(this.state.hasMore){
            this.setState({
                loading:true
            });
            this.getArticleList({},true)
        }

    }
    render() {
        const {list,total,hotList} = this.state;
        return(
            <Layout style={{height: 'calc(100vh - 64px)',overflowY: 'auto'}}>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                <Row type='flex' justify='space-around'>
                    <Col {...leftFlag}/>
                    <Col {...responsiveContent}  className="content-inner-wrapper home">

                            <ArticleList list={list} jumpTo={(e)=> this.jumpTo(e)} isLike={(e)=>this.controlLike(e)} />
                            {this.state.loading &&  (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                            )}
                        {/*{list.length  > 0 ? (<Pagination showQuickJumper current={currentPage} pageSize={pageSize} total={total} onChange={this.onChange} />) : (*/}
                            {/*<div className="no-data">*/}
                                {/*<Empty description={<NoDataDesc />} />*/}
                            {/*</div>*/}
                        {/*)}*/}
                    </Col>
                    <Col {...responsiveArticle}>
                        <Sider hotList={hotList} jumpTo={(e)=> this.jumpTo(e)} />
                    </Col>
                    <Col {...rightFlag}/>
                </Row>
                </InfiniteScroll>
            </Layout>
            )
        }
}

export default withRouter(Home)
