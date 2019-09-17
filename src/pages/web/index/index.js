import React, {Component, lazy, Suspense} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {Layout, Spin} from 'antd';
import {connect} from "react-redux";
import './index.less'
import Headernav from '@/components/web/header'
import {setWindowWidth} from '@/store/common/actions'
import {getAuthorInfo} from '@/store/user/actions'
import {throttle} from '@/lib/utils'
import Sider from "../home/home";
// import AuthModal from '@/components/web/authModal';

const AuthModal = lazy(() => import('@/components/web/authModal'))
const Archives = lazy(() => import('@/pages/web/archives/archives'))
const Home = lazy(() => import('@/pages/web/home/home'))
const Article = lazy(() => import('@/pages/web/article/article'))

const About = lazy(() => import('@/pages/web/about/about'))

function loading() {
    return (
        <Spin style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}
              tip="Loading..." size="large"/>
    )
}

@connect(
    null,
    (dispath) => ({
        setWindowWidth: () => dispath(setWindowWidth()),
        getAuthorInfo: () => dispath(getAuthorInfo())
    })
)
class Index extends Component {
    state = {};

    componentWillMount() {
        this.props.getAuthorInfo()
    }

    componentDidMount() {
        const windowWidth = document.getElementsByTagName('body')[0].clientWidth;
        this.props.setWindowWidth(windowWidth)
        window.addEventListener('resize', this.handleHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleHeight);
    }

    handleHeight = throttle(() => {
        const windowWidth = document.documentElement.clientWidth;
        this.props.setWindowWidth(windowWidth)

    }, 500)

    render() {
        return (
            <Layout className="app-container">
                <Headernav/>
                {/*<Home />*/}
                <Suspense fallback={loading()}>
                    <AuthModal/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/article/:id' component={Article}/>
                        <Route path='/about' component={About}/>
                        <Route path='/archives' component={Archives}/>

                    </Switch>
                </Suspense>
            </Layout>
        )
    }
}

export default Index
