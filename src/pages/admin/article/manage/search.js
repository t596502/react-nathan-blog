import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
} from 'antd';
import './index.less'
// import PropTypes from "prop-types";
import {categoryList,tagList} from "@/request/request";

const {Option} = Select;

@withRouter
class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        categoryList: [],
        tagList:[]
    };


    componentWillMount() {
        this.getCategoryList()
        this.getTagList()
    }

    getCategoryList() {
        categoryList().then(res => {
            const {code, data} = res
            if (code === 0) {
                this.setState({
                    categoryList: data
                })

            }
        })
    }
    getTagList() {
        tagList().then(res => {
            const {code, data} = res
            if (code === 0) {
                this.setState({
                    tagList: data
                })

            }
        })
    }
    handleReset = () => {
        this.props.form.resetFields();
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.history.push(`/admin/article/manage/?page=1&title=${values.title || ''}&category=${values.category || ''}&tag=${values.tag || ''}`)
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {categoryList,tagList} = this.state;
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
                <Row gutter={10}>
                    <Col span={6}>
                        <Form.Item label="标题">
                            {getFieldDecorator('title', {
                                rules: [
                                    {
                                        type: 'string',
                                        message: '请输入字符',
                                    },
                                ],
                            })(<Input placeholder='标题'/>)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="分类">
                            {getFieldDecorator('category', {
                                initialValue: '',
                            })(<Select
                                allowClear
                                showSearch
                                placeholder="category"
                                optionFilterProp="children"
                            >{categoryList.map((item,index) => (
                                <Option key={index} value={item.name}>{item.name}</Option>
                            ))}
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="标签">
                            {getFieldDecorator('tag', {
                                initialValue: '',
                            })(<Select
                                allowClear
                                showSearch
                                placeholder="tag"
                                optionFilterProp="children"
                            >{tagList.map((item,index) => (
                                <Option key={index} value={item.name}>{item.name}</Option>
                            ))}
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button style={{marginLeft:'10px'}} type="danger" onClick={this.handleReset}>
                                重置
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>


            </Form>
        );
    }
}

export default Form.create({name: 'register'})(RegistrationForm);

