import React, {Component} from 'react'
import {Row, Col, Input, Button, Modal, BackTop, message} from "antd";
import TnTags from '@/components/admin/tn-tags/tn-tags'
import SimpleMDE from 'simplemde';
import './edit.less'
import 'simplemde/dist/simplemde.min.css'
import {translateMarkdown} from "@/lib";
import * as api from "@/request/request";


class edit extends Component {
    state = {
        value: '',
        title: '',
        tagList: [],
        categoryList: [],
        isCreate: true, // 组件状态 更新或创建
    };
    categoryArray = [];
    componentDidMount() {
        console.log(this.props)
        this.smde = new SimpleMDE({
            element: document.getElementById('editor').childElementCount,
            autofocus: true,
            autosave: true,
            previewRender: translateMarkdown
        });

        if(this.props.location.state) this.getArticleDetail(this.props.location.state.id);
        else this.getCategoryList();
    }
    getArticleDetail(id) {
        api.articleDetail({id}).then(res => {
            const {code,data} = res
            if(code === 0){
                this.smde.value(data.content);
                const categoryList = data.category.map(d => d.name)
                this.setState({
                    title: data.title,
                    categoryList,
                    isCreate:false
                })
            }
        })
    }
    getCategoryList(){
        api.categoryList().then(res=>{
            console.log(res);
            const {code,data} = res
            if(code === 0){
                let newList = data.sort((a,b) => b.count - a.count).map(item=> item.name);
                newList = newList.slice(0,10);
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
        // const url = ''
        api.articleCreate(params).then(res=>{
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
    categorySelect = (value)=>{
        console.log(value);
        this.categoryArray = value
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
