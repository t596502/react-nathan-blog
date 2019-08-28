import React, {Component} from 'react';
import {Icon, Menu} from "antd";
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

class Nav extends Component {
    goNav = (link)=>{
        this.props.history.push(link)
    }
    render() {
        const {navList} = this.props;

        return (
            <div>
                <Menu
                    className={this.props.mode === 'horizontal' ? 'header-nav' :''}
                    mode={this.props.mode}
                    style={{borderRight:this.props.mode === 'vertical' ? '0' : ''}}
                >
                    {navList.map((item)=>(
                    <Menu.Item onClick={()=>this.goNav(item.link)}  key={item.link}>
                        {/*<Link onClick={()=>this.props.hideNav()} to={item.link}>*/}
                        <span>
                            {item.icon && <Icon type={item.icon} style={{fontSize:'16px'}}/>}
                            {item.title}
                        </span>
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
export default withRouter(Nav)
