import React, {Component} from 'react';
import {Icon, Menu, Row, Col} from "antd";

class Nav extends Component {

    render() {
        const {navList} = this.props
        return (
            <div>
                <Menu
                    className="header-nav"
                    mode="horizontal"
                >
                    {navList.map((item)=>(
                    <Menu.Item key={item.link}>
                        <Icon type={item.icon} style={{fontSize:'18px'}}/>{item.title}
                    </Menu.Item>
                    ))}
                </Menu>
            </div>
        )
    }
}

export default Nav
