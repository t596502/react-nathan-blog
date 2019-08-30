import React, { Component } from 'react'
import { Modal, Input, Icon, Button, Form } from 'antd'
import {connect} from "react-redux";
import { login,register } from '@/store/user/actions'
import {loginModalVisible,registerModalVisible} from '@/store/common/reducer'
import {closeAuthModal} from '@/store/common/actions'
import './index.less'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const FormItemLayout = {
    labelCol: {
        span:6
    },
    wrapperCol: {
        span:18
    }
}


@connect(
    state=>({
        loginModalVisible:state.common.loginModalVisible,
        registerModalVisible:state.common.registerModalVisible
    }),
    (dispatch)=>({
        closeAuthModal:(type)=>dispatch(closeAuthModal(type)),
        login:(params)=>dispatch(login(params)),
        register:(params)=>dispatch(register(params))
    })
)
class LoginModel extends Component {
    constructor(props){
        super(props);
        this.state = { type: 'login' } // 模态框类型
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.loginModalVisible) return { type: 'login' }
        if (nextProps.registerModalVisible) return { type: 'register' }
        return null
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const {type} = this.state;
                if(type === 'login'){
                    Object.assign(values,{type:101})
                }
                console.log(type);
                this.props[type](values).then(res=>{
                    if(res.code === 0){
                        this.props.closeAuthModal(type)
                    }
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
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('您输入的两个密码不一致!');
        } else {
            callback();
        }
    };
    handleClose = () => this.props.closeAuthModal(this.state.type)
    render() {
        const {type} =this.state
        const { loginModalVisible, registerModalVisible } = this.props
        const { getFieldDecorator, getFieldsError } = this.props.form;


        return(
            <Modal
                title={type}
                width={320}
                footer={null}
                visible={loginModalVisible || registerModalVisible}
                onCancel={()=>this.handleClose(type)}
            >
                <Form layout="horizontal" {...FormItemLayout} layout="inline"  onSubmit={this.handleSubmit}  >
                    {type !== 'login' &&
                    <Form.Item label='邮箱' >
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: 'input your E-mail!' },
                                {type: 'email', message: '请输入邮箱地址'},
                            ],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="邮箱"
                            />,
                        )}
                    </Form.Item>
                    }
                    <Form.Item label='账号' >
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: 'input your Password!' },
                                {type: 'string', max: 15,min:5, message: '5-10位字符'},
                                // {validator:this.usercodeValidator},
                                ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="账号"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label='密码'>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'input your Password!' },
                                {type: 'string', max: 15,min:6, message: '6-15位密码'},
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    {type !== 'login' &&
                    <Form.Item label='密码'>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                { required: type !== 'login', message: 'Please input your Password!' },
                                // {type: 'string', max: 15,min:6, message: '6-15位密码'},
                                {validator: this.compareToFirstPassword},
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="再次输入密码"
                            />,
                        )}
                    </Form.Item>
                    }
                        <div style={{marginTop:'10px'}}>
                            <Button block type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                {type !== 'login' ? '注册' :'登录'}
                            </Button>
                        </div>

                </Form>
            </Modal>
        )
    }
}

export default Form.create({name:'normal_login' })(LoginModel)
