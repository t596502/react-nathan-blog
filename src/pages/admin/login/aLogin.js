import React, { Component } from 'react'
import './aLogin.less'
// import { connect } from 'react-redux'
import { Button, message, Input, Icon } from 'antd'
import {login} from '@/request/request'

class ALogin extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })

    };

    handleSubmit = async () => {
        login(this.state).then(res=>{
            console.log(res);
        })
        // await this.props.login(this.state)
        // if (this.props.auth === 1) {
        //     this.props.history.push('/admin')
        //     message.success('登录成功')
        // } else if (this.props.auth === 2) {
        //     message.warning('您的权限不足！')
        // }
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

export default ALogin
