import React, {Component} from 'react'
import {Row, Col, Input,Button, Icon,BackTop} from "antd";
import SimpleMDE from 'simplemde';
import './edit.less'
import 'simplemde/dist/simplemde.min.css'
import {translateMarkdown} from "@/lib";
import {articleCreate} from "@/request/request";


class edit extends Component {
    state = {
        value: '',
        title: '',
        tagList: [],
        categoryList: [],
        isEdit: false // 组件状态 更新或创建
    }

    componentDidMount() {
        this.smde = new SimpleMDE({
            element: document.getElementById('editor').childElementCount,
            autofocus: true,
            autosave: true,
            previewRender: translateMarkdown
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    handleSubmit=()=>{
        const params = {
            title:this.state.title,
            content:this.smde.value()
        };
        console.log(this.smde.value());
        articleCreate(params).then(res=>{
            console.log(res);
        })
    };
    render() {
        const {value,title} = this.state
        return (
            <div className="add-article">
                <div className="title">
                    <span>标题</span>
                    <Input
                        value={title}
                        placeholder="请输入文章标题"
                        className="title-input"
                        name="title"
                        onChange={this.handleChange}
                    />
                </div>
                <br/>
                <textarea id="editor" defaultValue={value} />
                <Button onClick={this.handleSubmit} type="primary">
                    {'创建'}
                </Button>
                <BackTop />
            </div>
        )
    }
}

export default edit
