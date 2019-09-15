import React, {Component} from 'react'
import {Modal, Input, Icon, Button, Form, Row, Col,message} from 'antd'
import {connect} from "react-redux";
import {login, register} from '@/store/user/actions'
import {loginModalVisible, registerModalVisible} from '@/store/common/reducer'
import {closeAuthModal} from '@/store/common/actions'
import {getCode} from '@/request/request'
import './index.less'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
let timer = null;
const TIME = 61
const FormItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}


@connect(
    state => ({
        loginModalVisible: state.common.loginModalVisible,
        registerModalVisible: state.common.registerModalVisible
    }),
    (dispatch) => ({
        closeAuthModal: (type) => dispatch(closeAuthModal(type)),
        login: (params) => dispatch(login(params)),
        register: (params) => dispatch(register(params))
    })
)
class LoginModel extends Component {
    constructor(props) {
        super(props);
        this.state = {type: 'login',countdown:TIME} // 模态框类型
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.loginModalVisible) return {type: 'login'}
        if (nextProps.registerModalVisible) return {type: 'register'}
        return null
    }
    getCode = () =>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {countdown} = this.state

                timer = setInterval(()=>{

                    this.setState({
                        countdown:--countdown
                    });
                    console.log(this.state.countdown)
                    if(countdown <= 0){
                        this.setState({
                            countdown:TIME
                        });
                        clearInterval(timer)
                    }
                },1000)
                getCode(values).then(res=>{
                    const {msg,code} = res
                    console.log(res);
                    if(code === 0){
                        message.success(msg)

                    }else {
                        message.warning(msg)
                    }
                })
            }
        });
    }
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {type} = this.state;
                this.setState({
                    btnLoading: true
                });
                if (type === 'login') {
                    Object.assign(values, {type: 101})
                }
                this.props[type](values).then(res => {
                    this.setState({
                        btnLoading: false
                    })
                    if (res.code === 0) {
                        this.props.closeAuthModal(type)
                    }
                }).catch(err => {
                    this.setState({
                        btnLoading: false
                    })
                });
            }
        });
    };
    usercodeValidator = (rule, value, callback) => {

        // ！！！中文验证
        const reg = /[\u4E00-\u9FA5]{1,4}/;   /*定义验证表达式*/
        if (reg.test(value)) { /*进行验证*/
            callback('账号不能为中文');
            return;
        }

    };
    /**
     * 二次密码确认
     */
    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('您输入的两个密码不一致!');
        } else {
            callback();
        }
    };
    handleClose = () => this.props.closeAuthModal(this.state.type)

    render() {
        const {type, btnLoading,countdown} = this.state
        const {loginModalVisible, registerModalVisible} = this.props
        const {getFieldDecorator, getFieldsError} = this.props.form;


        return (
            <Modal
                title={type}
                width={320}
                footer={null}
                visible={loginModalVisible || registerModalVisible}
                onCancel={() => this.handleClose(type)}
            >
                <Form layout="horizontal" {...FormItemLayout} layout="inline" onSubmit={this.handleSubmit}>
                    {type !== 'login' &&
                    <Form.Item label='邮箱'>
                        {getFieldDecorator('email', {
                            rules: [
                                {required: true, message: '请输入邮箱!'},
                                {type: 'email', message: '请输入邮箱地址'},
                            ],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="邮箱"
                            />,
                        )}
                    </Form.Item>
                    }
                    <Form.Item label='账号'>
                        {getFieldDecorator('username', {
                            rules: [
                                {required: true, message: '请输入账号!'},
                                {type: 'string', max: 15, min: 5, message: '5-10位字符'},
                                // {validator:this.usercodeValidator},
                            ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="账号"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label='密码'>
                        {getFieldDecorator('password', {
                            rules: [
                                {required: true, message: '请输入密码!'},
                                {type: 'string', max: 15, min: 6, message: '6-15位密码'},
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    {type !== 'login' &&
                    <Form.Item label='密码'>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {required: type !== 'login', message: '请输入确认密码!'},
                                // {type: 'string', max: 15,min:6, message: '6-15位密码'},
                                {validator: this.compareToFirstPassword},
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="再次输入密码"
                            />,
                        )}
                    </Form.Item>
                    }
                    {type !== 'login' &&
                    <Form.Item label="验证码">
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('code')(<Input />)}
                            </Col>
                            <Col span={12}>
                                <Button disabled={countdown < TIME} onClick={this.getCode}>{countdown < TIME ? `${countdown}s` : '获取验证码'}</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    }
                    <div style={{marginTop: '10px'}}>
                        <Button loading={btnLoading} block type="primary" htmlType="submit"
                                disabled={hasErrors(getFieldsError())}>
                            {type !== 'login' ? '注册' : '登录'}
                        </Button>
                    </div>

                </Form>
            </Modal>
        )
    }
}

export default Form.create({name: 'normal_login'})(LoginModel)
