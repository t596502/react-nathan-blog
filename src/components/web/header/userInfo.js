import React, {Component} from 'react';
import { Button ,Dropdown,Menu,Avatar} from 'antd'
import {connect} from "react-redux";
import AuthModal from '../authModal'
import { openAuthModal } from '@/store/common/actions'
import { logout } from '@/store/user/actions'


@connect(
    state=>({username:state.user.username}),
    {openAuthModal,logout}
)
class UserInfo extends Component{

    menu = ()=> (
        <Menu>
            <Menu.Item>
                <span onClick={this.props.logout}>退出登录</span>
            </Menu.Item>
        </Menu>
    );

    render() {
        const {username} = this.props
        return(
            <div>
                {!username ? (
                    <div>
                        <div id="user-info">
                            <div className="login">
                                <Button type="primary" icon="login" onClick={()=>this.props.openAuthModal('login')}>登录</Button>
                            </div>
                            <Button type="danger" ghost onClick={()=>{this.props.openAuthModal('register')}}>注册</Button>
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
