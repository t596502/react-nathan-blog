import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import './settingUp.less'
import { Upload, Icon,Form,Input,Divider,Button,message } from 'antd';

const { TextArea } = Input;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class SettingUp extends Component {
    state = {
        loading: false,
    };

    handleChange = info => {
        console.log(info);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 11,
                },
            },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div className='user-container'>
                <h1>基本</h1>
                <Form {...formItemLayout} className='form-wrapper' onSubmit={this.handleSubmit}>
                    <div className='top'>
                        <section>
                            <Form.Item label="昵称">
                                {getFieldDecorator('nickname')(<Input />)}
                            </Form.Item>
                            <Form.Item label="学历">
                                {getFieldDecorator('diploma')(<Input />)}
                            </Form.Item>
                            <Form.Item label="E-mail">
                                {getFieldDecorator('email')(<Input />)}
                            </Form.Item>
                            <Form.Item label="城市">
                                {getFieldDecorator('city')(<Input />)}
                            </Form.Item>
                            <Form.Item label="联系方式">
                                {getFieldDecorator('contact')(<Input />)}
                            </Form.Item>
                            <Form.Item label="个人技能">
                                {getFieldDecorator('contact')(<TextArea rows={4} />)}
                            </Form.Item>
                            <Form.Item label="其它">
                                {getFieldDecorator('contact')(<TextArea rows={4} />)}
                            </Form.Item>
                        </section>
                        <Divider type="vertical" style={{height:'100vh'}} />
                        <section>
                            <Form.Item label="Upload" extra="longgggg">
                                {getFieldDecorator('upload', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload
                                        name="logo"
                                        action="/upload.do"
                                        listType="picture-card"
                                        showUploadList={false}
                                        className="avatar-uploader"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >

                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}

                                    </Upload>,
                                )}
                            </Form.Item>
                        </section>
                    </div>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const SettingUpForm = Form.create({ name: 'register' })(SettingUp);
export default SettingUpForm
