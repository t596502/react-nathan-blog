import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Sider from '../../../components/web/sider'
import { Layout,Row,Col,Icon,Tags,Divider } from 'antd';
import Article from '../article/article'
import {articleList} from '@/request/request'
import {translateMarkdown} from '@/lib'
import './index.less'
const rightFlag =         {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 0};
const responsiveContent = {xxl: 12, xl:13, lg: 17,md:17, sm: 22, xs: 24};
const responsiveArticle = {xxl: 4, xl: 5, lg: 5, md:5,sm: 0, xs: 0 };
const leftFlag =          {xxl: 4, xl: 3, lg: 1, md:1,sm: 1, xs: 0};
// const gutter = { xxl: 2, xl:2, lg: 16,md:16, sm: 0, xs: 0}
class Home extends Component{
    state ={
        list:[],
        total:0,

    };
    componentWillMount() {
        this.getArticleList()
    }
    getArticleList(){
        articleList().then(res=>{
            console.log(res);
            const {code,data,msg} =res
            if(code === 0){
                const list = data.rows
                list.forEach(item=>{
                    item.content = translateMarkdown(item.content)
                });
                this.setState({
                    list
                })
            }
        })
    }
    jumpTo=(id)=>{
        console.log(this.props);
        this.props.history.push(`/article/${id}`)
    };
    render() {
        const {list} = this.state;
        return(
            <div>
                <Row type='flex' justify='space-around'>
                    <Col {...leftFlag}/>
                    <Col {...responsiveContent}  className="content-inner-wrapper home">
                        <ul className="ul-list">
                            {list.map(item => (
                                <li key={item.id} className="ul-list-item">
                                    <Divider orientation="left">
                                        <span className="title" onClick={() => this.jumpTo(item.id)}>{item.title}</span>
                                    </Divider>

                                    {/*<div*/}
                                        {/*// onClick={() => this.jumpTo(item.id)}*/}
                                        {/*className="article-detail description"*/}
                                        {/*dangerouslySetInnerHTML={{ __html: item.content }}*/}
                                    {/*/>*/}

                                    <div className="list-item-action">
                                        <Icon type="message" style={{ marginRight: 7 }} />
                                        <span className="create-time">{item.created_at.slice(0, 10)}</span>

                                        {/*{getCommentsCount(item.comments)}*/}
                                        {/*<Tags type="tags" list={item.tags} />*/}
                                        {/*<Tags type="categories" list={item.categories} />*/}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col {...responsiveArticle}>
                        <Sider></Sider>
                    </Col>
                    <Col {...rightFlag}/>
                </Row>
            </div>
        )
    }
}

export default withRouter(Home)
