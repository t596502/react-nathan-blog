import React, { Component,Fragment } from 'react'
import {withRouter} from 'react-router-dom'
import { Layout,Row,Col,Tags ,Spin} from 'antd';
import ArticleList from '@/components/web/list/list';
import InfiniteScroll from 'react-infinite-scroller'
import Sider from '../../../components/web/sider'
// import {articleList,getCategoryList} from '@/request/request'
import * as api from '@/request/request'
import {translateMarkdown,decodeQuery} from '@/lib'
import './index.less'
const rightFlag =         {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 0};
const responsiveContent = {xxl: 12, xl:13, lg: 17,md:17, sm: 22, xs: 24};
const responsiveArticle = {xxl: 4, xl: 5, lg: 5, md:5,sm: 0, xs: 0 };
const leftFlag =          {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 0};


const pageSize = 5

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
        categoryList:[]
    };
    currentPage = 1
    componentWillMount() {
        this.query = decodeQuery(this.props.location.search)
        console.log(this.props);
        if(!this.state.list.length)this.getArticleList()
        this.getHotArticleList()
        this.getCategoryList()
    }
    componentWillReceiveProps(nextProps){
        this.currentPage = 1
        this.query = decodeQuery(nextProps.location.search)
        this.getArticleList()
    }
    getArticleList(isMore){
        let params = {
            pageSize,
            page:this.currentPage
        };
        if(JSON.stringify(this.query) !== '{}'){
            delete params.page
            Object.assign(params,this.query)
            // delete params.
        }
        api.articleList(params).then(res=>{
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
                if(this.state.list.length && params.page != 1){
                    this.setState({
                        list:this.state.list.concat(list)
                    })
                }else {
                    this.setState({
                        list,
                        // total:data.count
                    });
                }
                ++this.currentPage
            }
        })
    }
    getHotArticleList(){
        api.articleList({is_hot:1}).then(res=>{
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
    /*
    onChange=(pageNumber)=>{
        this.currentPage = pageNumber;
        this.getArticleList()
    };
    */
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

    };
    getCategoryList(){
        api.categoryList().then(res=>{
            console.log(res);
            const {code,data} = res
            if(code === 0){
                let newList = data.sort((a,b) => b.count - a.count).map(item=> item.name);
                newList = newList.slice(0,10);
                this.setState({
                    categoryList:newList
                })
            }
        })
    }
    render() {
        const {list,hotList,categoryList} = this.state;
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

                            <ArticleList list={list} jumpTo={(e)=> this.jumpTo(e)} />
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
                        <Sider categoryList={categoryList} hotList={hotList} jumpTo={(e)=> this.jumpTo(e)} />
                    </Col>
                    <Col {...rightFlag}/>
                </Row>
                </InfiniteScroll>
            </Layout>
            )
        }
}

export default withRouter(Home)
