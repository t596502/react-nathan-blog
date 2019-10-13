import React, { Component } from 'react'
import './settingUp.less'
import { Upload, Icon,Form,Input,Divider,Button,message,Card } from 'antd';
import * as api from '@/request/request'
const { TextArea } = Input;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload() {

    return false;
}

class SettingUp extends Component {
    state = {
        loading: false,
        authorInfo:{}
    };
    componentWillMount() {
        api.getAuthorInfo().then(res=>{
            const {data,code,msg} = res
            if(code === 0){
                this.setState({
                    authorInfo:data,
                    imageUrl:data.avatar
                })
            }else {
                message.warning(msg)
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const {authorInfo} = this.state
            if (!err) {
                const uploadImg = new FormData();
                if(values.upload){
                    const file =values.upload[values.upload.length-1]
                    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                    if (!isJpgOrPng) {
                        message.error('You can only upload JPG/PNG file!');
                        return
                    }
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                        message.error('Image must smaller than 2MB!');
                        return
                    }
                    uploadImg.append('avatar', file.originFileObj);
                }
                for(let key in values){
                    if(key !== 'upload'){
                        uploadImg.append(key, values[key]);
                    }
                }
                if(authorInfo.id){                // 更新信息
                    uploadImg.append('id',authorInfo.id)
                }
                api.upload(uploadImg).then(res=>{
                    const {code,msg} = res
                    if(code === 0){
                        message.success('提交成功')
                    }else {
                        message.warning(msg)
                    }
                })
            }
        });
    };
    handleChange = info => {
        /*
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
        }*/

        getBase64(info.fileList[info.fileList.length-1].originFileObj, imageUrl =>
            this.setState({
                imageUrl,
                loading: false,
            }),
        );
    };
    normFile = e => {
        if (Array.isArray(e)) {
            return e.file[e.file];
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
        const config = {
            rules: [{ required: true, message: 'Please input!' }],
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl,authorInfo } = this.state;
        return (
            <div className='user-container'>
                <Card title='个人设置' >
                    <Form {...formItemLayout} className='form-wrapper' onSubmit={this.handleSubmit}>
                        <div className='top'>
                            <section>
                                <Form.Item label="昵称">
                                    {getFieldDecorator('nickname', {
                                        initialValue:authorInfo.nickname,
                                        ...config
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="学历">
                                    {getFieldDecorator('education',{
                                        initialValue:authorInfo.education,
                                        ...config
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="E-mail">
                                    {getFieldDecorator('email',{
                                        initialValue:authorInfo.email,
                                        ...config
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="城市">
                                    {getFieldDecorator('city',{
                                        initialValue:authorInfo.city,
                                        ...config
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="联系方式">
                                    {getFieldDecorator('contact',{
                                        initialValue:authorInfo.contact,
                                        ...config
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="个人技能">
                                    {getFieldDecorator('skill',{
                                        initialValue:authorInfo.skill,
                                        ...config
                                    })(<TextArea rows={4} />)}
                                </Form.Item>
                                <Form.Item label="其它">
                                    {getFieldDecorator('other',{
                                        initialValue:authorInfo.other,
                                        ...config
                                    })(<TextArea rows={4} />)}
                                </Form.Item>
                            </section>
                            <Divider type="vertical" style={{height:'100vh'}} />
                            <section>
                                <Form.Item label="Upload">
                                    {getFieldDecorator('upload', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: this.normFile
                                    })(
                                        <Upload
                                            name="logo"
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
                </Card>
            </div>
        );
    }
}
const SettingUpForm = Form.create({ name: 'register' })(SettingUp);
export default SettingUpForm
