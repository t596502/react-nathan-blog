import React, {Component} from 'react'
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    AutoComplete,
} from 'antd';
import './index.less'
const {Option} = Select;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };



    render() {
        const {getFieldDecorator} = this.props.form;


        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
                <Row gutter={10}>
                    <Col span={6}>
                        <Form.Item label="标题" >
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                ],
                            })(<Input placeholder='标题' />)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="标签">
                            {getFieldDecorator('tags', {
                                initialValue: 'jack',
                            })( <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="分类">
                            {getFieldDecorator('classify', {
                                initialValue: 'jack',
                            })( <Select
                                showSearch
                                placeholder="Select a classify"
                                optionFilterProp="children"
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
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

export const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);

