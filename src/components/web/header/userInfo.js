import React, {Component} from 'react';
import { Button ,Dropdown,Menu,Avatar} from 'antd'
import {connect} from "react-redux";
import { openAuthModal } from '@/store/common/actions'
import { logout } from '@/store/user/actions'
import AuthorAvatar from '../authorAvatar/authorAvatar'


@connect(
    state=>({
        username:state.user.username,
        authorInfo:state.user.authorInfo,
        auth:state.user.auth,
        windowWidth:state.common.windowWidth,
        colorMap: state.common.colorMap
    }),
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

    authAvatar = (auth,username,colorMap) => {
        return auth < 10 ? <Avatar style={{color: '#fff', backgroundColor: colorMap[username]}}>{username}</Avatar> :
            <AuthorAvatar />
    }

    render() {
        const {username,windowWidth,auth,colorMap} = this.props;

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
                    </div>
                    ): (
                    <Dropdown
                        overlay={this.menu()}
                        placement="bottomLeft"
                        trigger={['click', 'hover']}
                    >
                        {/*{this.authAvatar(auth,username,colorMap)}*/}
                        {/*<Avatar {...avatarProps} >{auth <10 ? username : ''}</Avatar>*/}
                            <div>
                                {this.authAvatar(auth,username,colorMap)}
                            </div>


                    </Dropdown>
                    )
                }

            </div>

        )
    }
}

export default UserInfo
