import React, { Component,Fragment } from 'react'
import {withRouter} from 'react-router-dom'
import { Layout,Row,Col,Empty ,Spin} from 'antd';
import ArticleList from '@/components/web/list/list';
import InfiniteScroll from 'react-infinite-scroller'
import Sider from '../../../components/web/sider'
// import {articleList,getCategoryList} from '@/request/request'
import * as api from '@/request/request'
import {translateMarkdown,decodeQuery} from '@/lib'
import './index.less'
import {connect} from "react-redux";
const rightFlag =         {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 0};
const responsiveContent = {xxl: 12, xl:13, lg: 17,md:16, sm: 22, xs: 24};
const responsiveArticle = {xxl: 4, xl: 5, lg: 5, md:6,sm: 0, xs: 0 };
const leftFlag =          {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 0};


const pageSize = 5

const NoDataDesc = () => (
    <Fragment>
        不存在标题中含有的文章！
    </Fragment>
);
@connect(
    state=>({
        authorInfo:state.user.authorInfo
    }),
    null
)
class Home extends Component{

    state ={
        list:[],
        // total:0,
        hotList:[],
        loading:false,
        hasMore: true,
        tagsList:[]
    };
    currentPage = 1
    componentWillMount() {
        this.query = decodeQuery(this.props.location.search);
        const {list,tagsList,hotList} = this.state;
        if(!list.length)this.getArticleList();
        if(!hotList.length) this.getHotArticleList();
        if(!tagsList.length) this.getTagsList()
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
            const {code,data} =res
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
    jumpTo=(id,e)=>{
        e.stopPropagation()
        this.props.history.push(`/article/${id}`)
    };
    categoryTo=(category,e)=>{
        e.stopPropagation()
        this.props.history.push(`/?page=1&category=${category}`)
    };
    tagsTo=(tag,e)=>{
        e.stopPropagation()
        this.props.history.push(`/?page=1&tag=${tag}`)
    };
    handleInfiniteOnLoad=()=>{
        if(this.state.hasMore){
            this.setState({
                loading:true
            });
            this.getArticleList({},true)
        }

    };
    getTagsList(){
        api.tagList().then(res=>{
            console.log(res);
            const {code,data} = res
            if(code === 0){
                let newList = data.sort((a,b) => b.count - a.count).map(item=> item.name);
                newList = newList.slice(0,10);
                this.setState({
                    tagsList:newList
                })
            }
        })
    }
    render() {
        const {list,hotList,tagsList} = this.state;
        const {authorInfo} = this.props
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

                            <ArticleList list={list} categoryTo={this.categoryTo} tagsTo={this.tagsTo} jumpTo={this.jumpTo}  />
                            {this.state.loading &&  (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                            )}
                        {list.length  === 0 && <Empty style={{marginTop:'15em'}} description={<NoDataDesc />}/>}
                        {/*{list.length  > 0 ? (<Pagination showQuickJumper current={currentPage} pageSize={pageSize} total={total} onChange={this.onChange} />) : (*/}
                            {/*<div className="no-data">*/}
                        {/*</div>*/}
                        {/*)}*/}
                    </Col>
                    <Col {...responsiveArticle}>
                        <Sider
                            avatar={authorInfo.avatar}
                            tagsList={tagsList}
                            hotList={hotList}
                            jumpTo={(e)=> this.jumpTo(e)} />
                    </Col>
                    <Col {...rightFlag}/>
                </Row>
                </InfiniteScroll>
            </Layout>
            )
        }
}

export default withRouter(Home)
