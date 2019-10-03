import React, {Component, lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Layout, Spin} from 'antd';
import {connect} from "react-redux";
import './index.less'
import Headernav from '@/components/web/header'
import {setWindowWidth} from '@/store/common/actions'
import {getAuthorInfo} from '@/store/user/actions'
import {throttle} from '@/lib/utils'

const AuthModal = lazy(() => import('@/components/web/authModal'))


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
                    {this.props.children}
                </Suspense>
            </Layout>
        )
    }
}

export default Index
