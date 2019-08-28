import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, message, Input, Icon } from 'antd'
import {connect} from "react-redux";
import { login } from '@/store/user/actions'
import './aLogin.less'
import reduxAction from '@/store'

// @withRouter
// @connect(
//     state => state.user,
//     { login }
// )
class ALogin extends Component {
    state = {
        username: '',
        password: ''
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })

    };

    handleSubmit = () => {
        let params = {
            type:101
        };
        Object.assign(params,this.state)
        // const a = await this.props.mapLogin(params);
        this.props.mapLogin(params).then(res=>{
            if (this.props.auth === 10) {
                this.props.history.push('/admin')
                message.success('登录成功')
            } else  {
                message.warning('您的权限不足！')
            }
        })
    };

    render() {
        return (
            <div className="login-container">
                <div className="login-form">
                    {/*<img src={logo} alt="" className="App-logo" />*/}
                    <Input
                        size="large"
                        style={{ marginBottom: 25 }}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <Input
                        size="large"
                        style={{ marginBottom: 25 }}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <Button style={{ width: '100%' }} size="large" type="primary" onClick={this.handleSubmit}>
                        登录
                    </Button>
                </div>
            </div>
        )
    }
}
const mapState = (state,props)=>{
    return{
        auth:state.user.auth
    }
}

const mapToAction = (dispatch)=>({
     mapLogin(params){
         return dispatch(login(params))
    },
});

export default connect(mapState,mapToAction)(withRouter(ALogin))
// export default ALogin
