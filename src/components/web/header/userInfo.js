import React, {Component} from 'react';
import { Button } from 'antd'
import {connect} from "react-redux";
import AuthModal from '../authModal'
import { openAuthModal } from '@/store/common/actions'


@connect(
    null,
    {openAuthModal}
)
class UserInfo extends Component{

    render() {
        return(
            <div>
                <div id="user-info">
                    <div className="login">
                        <Button type="primary" icon="login" onClick={()=>this.props.openAuthModal('login')}>登录</Button>
                    </div>
                    <Button type="danger" ghost onClick={()=>{this.props.openAuthModal('register')}}>注册</Button>
                </div>
                <AuthModal />
            </div>

        )
    }
}

export default UserInfo
