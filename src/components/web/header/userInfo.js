import React, {Component,lazy} from 'react';
import { Button ,Dropdown,Menu,Avatar} from 'antd'
import {connect} from "react-redux";
import { openAuthModal } from '@/store/common/actions'
import { logout } from '@/store/user/actions'

import AuthModal from '../authModal';


@connect(
    state=>({username:state.user.username,windowWidth:state.common.windowWidth}),
    {openAuthModal,logout}
)
class UserInfo extends Component{
    state={
        screenWidth:'auto'
    }
    menu = ()=> (
        <Menu>
            <Menu.Item>
                <span onClick={this.props.logout}>退出登录</span>
            </Menu.Item>
        </Menu>
    );

    render() {
        const {username,windowWidth} = this.props
        return(
            <div>
                {!username ? (
                    <div>
                        <div id="user-info">
                            <div className="login">
                                <Button type={windowWidth > 600 ? 'primary' : 'link'} size={windowWidth > 600 ? 'default' : 'small'} onClick={()=>this.props.openAuthModal('login')}>登录</Button>
                            </div>
                            <div className='register'>
                                <Button type="danger" size={windowWidth > 600 ? 'default' : 'small'} ghost onClick={()=>{this.props.openAuthModal('register')}}>注册</Button>
                            </div>
                        </div>
                        <AuthModal />
                    </div>
                    ): (
                    <Dropdown
                        overlay={this.menu()}
                        placement="bottomLeft"
                    >
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{username}</Avatar>
                    </Dropdown>
                    )
                }

            </div>

        )
    }
}

export default UserInfo
