import React, {Component} from 'react';
import {Icon, Menu} from "antd";
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

class Nav extends Component {

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
                    <Menu.Item key={item.link}>
                        <Link to={item.link}>
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
