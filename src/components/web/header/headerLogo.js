import React,{Component} from 'react'
import { Icon, Drawer, Menu } from 'antd'
import { Link } from 'react-router-dom'
import Nav from "./nav";

class headerLogo extends Component{
    state = { visible: false, placement: 'left' };

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
    render(){
        return(
            <div className="header-logo">
                <Link to='/' replace >Nathan的博客</Link>
                <Icon type="menu-o" className="nav-phone-icon" onClick={this.showDrawer} />
                <Drawer
                    title="Nathan的博客"
                    placement='left'
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={true}
                    onClose={this.onClose}
                >
                    <Nav mode={'vertical'} navList={this.props.navList}/>
                </Drawer>
            </div>
        )
    }
};
export default headerLogo
