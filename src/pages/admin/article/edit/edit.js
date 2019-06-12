import React, {Component} from 'react'
import {Row, Col, Input,Button, Icon,BackTop} from "antd";
import SimpleMDE from 'simplemde'
import './edit.less'
import 'simplemde/dist/simplemde.min.css'
import hljs from 'highlight.js'
import marked from 'marked'
import xss from 'xss'

const translateMarkdown = plainText => {
    return marked(xss(plainText), {
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: function(code) {
            return hljs.highlightAuto(code).value
        }
    })
}
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

    };
    handleSubmit=()=>{
        console.log(this.smde.value());
    };
    render() {
        const {value} = this.state
        return (
            <div className="add-article">
                <div className="title">
                    <span>标题</span>
                    <Input
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
