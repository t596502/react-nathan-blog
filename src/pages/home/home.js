import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Row, Col, Empty, Spin } from 'antd';
import ArticleList from '@/components/list/list';
import InfiniteScroll from 'react-infinite-scroller'
import Sider from '@/components/sider'
// import {articleList,getCategoryList} from '@/request/request'
import * as api from '@/request/request'
import { decodeQuery } from '@/lib'
import { debounce } from '@/lib/utils'
import './index.less'
import { connect } from "react-redux";
const rightFlag = { xxl: 4, xl: 3, lg: 1, md: 1, sm: 1, xs: 0 };
const responsiveContent = { xxl: 12, xl: 13, lg: 17, md: 16, sm: 22, xs: 24 };
const responsiveArticle = { xxl: 4, xl: 5, lg: 5, md: 6, sm: 0, xs: 0 };
const leftFlag = { xxl: 4, xl: 3, lg: 1, md: 1, sm: 1, xs: 0 };



const pageSize = 8

const NoDataDesc = () => (
  <Fragment>
    不存在标题中含有的文章！
    </Fragment>
);
@connect(
  state => ({
    authorInfo: state.user.authorInfo
  }),
  null
)
class Home extends Component {

  state = {
    list: [],
    // total:0,
    hotList: [],
    loading: false,
    hasMore: true,
    tagsList: [],
    skeletonLoading: false
  };
  currentPage = 1
  componentWillMount() {
    this.query = decodeQuery(this.props.location.search);
    const { list, tagsList, hotList } = this.state;
    if (!list.length) this.getArticleList();
    if (!hotList.length) this.getHotArticleList();
    if (!tagsList.length) this.getTagsList()
    console.log('componentWillMount')
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search && this.props.location.search !== nextProps.location.search) {
      this.currentPage = 1
      this.query = decodeQuery(nextProps.location.search)
      this.getArticleList()
    }

  }
  getArticleList = debounce((isMore) => {
    if (isMore) {// 显示上拉加载loading
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 1000)
    } else { // 骨架屏
      this.setState({ skeletonLoading: true });
    }

    let params = {
      pageSize,
      page: this.currentPage
    };
    if (JSON.stringify(this.query) !== '{}') {
      delete params.page
      Object.assign(params, this.query)
      // delete params.
    }
    if (params.title) {
      params.title = decodeURI(params.title)
    }
    api.articleList(params).then(res => {
      if (!isMore) { //
        setTimeout(() => {
          this.setState({ skeletonLoading: false });
        }, 1000)
      }

      const { code, data } = res


      if (code === 0) {

        const list = data.rows;
        this.setState({
          hasMore: list.length === pageSize
        });
        if (this.state.list.length && params.page != 1) {
          this.setState({
            list: this.state.list.concat(list)
          })
        } else {
          this.setState({
            list,
            // total:data.count
          });
        }
        ++this.currentPage
      }
    })
  }, 100)
  getHotArticleList() {
    api.articleList({ is_hot: 1 }).then(res => {
      const { code, data } = res
      if (code === 0) {
        const hotList = data.rows;
        hotList.map(item => ({
          id: item.id,
          title: item.title
        }));
        this.setState({
          hotList,
        })
      }
    })
  }
  jumpTo = (id, e) => {
    e.stopPropagation()
    this.props.history.push(`/article/${id}`)
  };
  categoryTo = (category, e) => {
    e.stopPropagation()
    this.props.history.push(`/?page=1&category=${category}`)
  };
  tagsTo = (tag, e) => {
    e.stopPropagation()
    this.props.history.push(`/?page=1&tag=${tag}`)
  };
  handleInfiniteOnLoad = () => {
    if (this.state.hasMore) {
      this.setState({
        loading: true
      });
      this.getArticleList({}, true)
    }

  };
  getTagsList() {
    api.tagList().then(res => {
      const { code, data } = res
      if (code === 0) {
        let newList = data.sort((a, b) => b.count - a.count).map(item => item.name);
        newList = newList.slice(0, 10);
        this.setState({
          tagsList: newList
        })
      }
    })
  }
  render() {
    const { list, hotList, tagsList, skeletonLoading } = this.state;
    const { authorInfo } = this.props
    return (
      <Layout style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore && list.length}
          useWindow={false}
        >
          <Row type='flex' justify='space-around'>
            <Col {...leftFlag} />
            <Col {...responsiveContent} className="content-inner-wrapper home">
              <ArticleList
                skeletonLoading={skeletonLoading}
                list={list}
                categoryTo={this.categoryTo}
                tagsTo={this.tagsTo}
                jumpTo={this.jumpTo} />




              {this.state.loading && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
              {list.length === 0 && <Empty style={{ marginTop: '15em' }} description={<NoDataDesc />} />}
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
                jumpTo={this.jumpTo} />
            </Col>
            <Col {...rightFlag} />
          </Row>
        </InfiniteScroll>
      </Layout>
    )
  }
}

export default withRouter(Home)
