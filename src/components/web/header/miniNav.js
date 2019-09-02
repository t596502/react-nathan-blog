import React, {Component} from 'react'
import {Icon, Drawer} from 'antd'
import Nav from "./nav";
import { withRouter } from 'react-router-dom'
import {connect} from "react-redux";

@withRouter
@connect(
    state=>({windowWidth:state.common.windowWidth}),null
)
class MiniNav extends Component {
    state = {visible: false};
    componentWillUnmount() {
        console.log(this.props.pathname);
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    hideNav = () => {
        console.log(this.props.location.pathname);
        this.setState({
            visible: false,
        });

    };
    getTitle = (pathname,showDrawer)=>{
        let title = ''
        this.props.navList.forEach(item=>{
            if(this.props && item.link === pathname){
                title= item.title
            }
        });
        return <a href='javascript:;' onClick={showDrawer}  className='mini-nav-title'>{title}</a>
    };
    render() {
        const {windowWidth} = this.props;
        return (
            <div id="header-mini-nav">
                <Drawer
                    title="Nathan的博客"
                    placement='left'
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={true}
                    onClose={this.onClose}
                >
                    <Nav
                        mode={'vertical'}
                        hideNav={(value) => this.hideNav(value)}
                        navList={this.props.navList}/>
                </Drawer>
                <Icon type="menu-o" className="nav-phone-icon" onClick={this.showDrawer}/>
                {windowWidth > 600 ? this.getTitle(this.props.location.pathname,this.showDrawer) : ''}
            </div>
        )
    }
}

export default MiniNav
