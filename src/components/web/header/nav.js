import React, {Component} from 'react';
import {Icon, Menu} from "antd";
import { withRouter,Link } from 'react-router-dom'
import PropTypes from 'prop-types';
//                         {/*<Link onClick={()=>this.props.hideNav()} to={item.link}>*/}
//onClick={()=>this.goNav(item.link)}
@withRouter
class Nav extends Component {
    render() {
        const {navList} = this.props;

        return (
            <div id='com-nav-wrapper'>
                <Menu
                    className={this.props.mode === 'horizontal' ? 'header-nav' :''}
                    mode={this.props.mode}
                    style={{borderRight:this.props.mode === 'vertical' ? '0' : ''}}
                    selectedKeys={[this.props.location.pathname]}
                >
                    {navList.map((item)=>(
                    <Menu.Item key={item.link}>
                        <Link onClick={()=>this.props.hideNav ? this.props.hideNav(item.title) : ''} to={{pathname:item.link}}>
                            {item.icon && <Icon type={item.icon} style={{fontSize:'16px'}}/>}
                            {item.title}
                        </Link>
                    </Menu.Item>
                    ))}
                </Menu>
            </div>
        )
    }
}
Nav.propTypes ={
    mode:PropTypes.string
};
// vertical
Nav.defaultProps = {
    mode: 'horizontal'
};
export default Nav
