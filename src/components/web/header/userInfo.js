import React, {Component} from 'react';
import { Button } from 'antd'

class UserInfo extends Component{

    render() {
        return(
            <div id="user-info">
                <div className="login">
                        <Button type="primary" icon="login">登录</Button>
                </div>
                <Button type="danger" ghost>注册</Button>
            </div>

        )
    }
}

export default UserInfo
