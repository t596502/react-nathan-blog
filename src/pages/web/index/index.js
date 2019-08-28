import React, {Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import Headernav from '@/components/web/header'
import Home from '@/pages/web/home/home'
import Article from '@/pages/web/article/article'
import About from '@/pages/web/about/about'
import './index.less'

// const Headernav = lazy(()=> import('@/components/web/header'))
// const Home = lazy(()=> import('@/pages/web/home/home'))
// const Article = lazy(()=> import('@/pages/web/article/article'))
// const About = lazy(()=> import('@/pages/web/about/about'))


class Index extends Component{
    state ={
    };
    componentWillMount() {

    }

    render() {
        return(
            <Layout className="app-container">
                <Headernav />
                {/*<Home />*/}
                <Switch>
                    <Route path='/article/:id' component={Article} />
                    <Route path='/about' component={About} />
                    <Route path='/' component={Home} />
                </Switch>
            </Layout>
        )
    }
}

export default Index
