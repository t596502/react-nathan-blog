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
import {categoryList} from "@/request/request";

const {Option} = Select;

@withRouter
class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        categoryList: [],
    };


    componentWillMount() {
        this.getCategoryList()
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

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.history.push(`/admin/article/manage/?page=1&title=${values.title || ''}&category=${values.category || ''}`)
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {categoryList} = this.state;
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
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                            >{categoryList.map(item => (
                                <Option key={item.name} value={item.name}>{item.name}</Option>
                            ))}
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>


            </Form>
        );
    }
}

export default Form.create({name: 'register'})(RegistrationForm);

