import React, {Component} from 'react'
import {Row, Col, Input, Button, Modal, BackTop, message} from "antd";
import TnTags from '@/components/admin/tn-tags/tn-tags'
import SimpleMDE from 'simplemde';
import './edit.less'
import 'simplemde/dist/simplemde.min.css'
import {translateMarkdown} from "@/lib";
import {articleCreate,categoryList} from "@/request/request";


class edit extends Component {
    state = {
        value: '',
        title: '',
        tagList: [],
        categoryList: [],
        isEdit: false, // 组件状态 更新或创建
    };
    categoryArray = []
    componentDidMount() {
        this.smde = new SimpleMDE({
            element: document.getElementById('editor').childElementCount,
            autofocus: true,
            autosave: true,
            previewRender: translateMarkdown
        });
        this.getCategoryList()
    }
    getCategoryList(){
        categoryList().then(res=>{
            console.log(res);
            const {code,data} = res
            if(code === 0){
                let newList = data.sort((a,b) => b.count - a.count).map(item=> item.name);
                newList = newList.slice(0,10)
                this.setState({
                    categoryList:newList
                })
            }
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
            content:this.smde.value(),
            categories:this.categoryArray
        };
        console.log(this.smde.value());
        articleCreate(params).then(res=>{
            console.log(res);
            const {code,data} = res
            if(code === 0){
                Modal.confirm({
                    title: '提交成功',
                    content: '文章提交成功，是否查看？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk:()=>{
                        this.props.history.push(`/article/${data.id}`)
                    }
                });
            }
        })
    };
    categorySelect = (e)=>{
        console.log(e);

    };
    render() {
        const {value,title,categoryList} = this.state
        return (
            <div className="add-article">
                <div className="title">
                    <span>标题:</span>
                    <Input
                        value={title}
                        placeholder="请输入文章标题"
                        className="title-input"
                        name="title"
                        onChange={this.handleChange}
                    />
                </div>
                <br/>
                <div className="title">
                    <span>分类:</span><TnTags selectFn={(e)=>this.categorySelect(e)} list={categoryList}/>
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
