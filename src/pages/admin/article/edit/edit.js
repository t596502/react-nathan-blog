import React, {Component} from 'react'
import { Input, Button, Modal, BackTop, message} from "antd";
import TnTags from '@/components/admin/tn-tags/tn-tags'
import SimpleMDE from 'simplemde';
import './edit.less'
import 'simplemde/dist/simplemde.min.css'
import {translateMarkdown} from "@/lib";
import * as api from "@/request/request";

const UPDATE = 'articleUpdate'
const CREATE = 'articleCreate'
class edit extends Component {
    state = {
        value: '',
        title: '',
        categoryList: [],
        tagsList:[],
        isCreate: true, // 组件状态 更新或创建
    };
    category = '';
    tag='';
    componentDidMount() {
        this.smde = new SimpleMDE({
            element: document.getElementById('editor').childElementCount,
            autofocus: true,
            autosave: true,
            previewRender: translateMarkdown
        });

        if(this.props.location.state){
            this.getArticleDetail(this.props.location.state.id);
        } else {
            this.getCategoryList();
            this.getTagList();
        }
    }
    getArticleDetail(id) {
        api.articleDetail({id}).then(res => {
            const {code,data} = res
            if(code === 0){
                this.smde.value(data.content);
                const categoryList = data.category.map(d => d.name)
                const tagsList = data.tags.map(d => d.name)
                this.setState({
                    title: data.title,
                    categoryList,
                    tagsList,
                    isCreate:false
                })
            }
        })
    }
    getCategoryList(){
        api.categoryList().then(res=>{
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
    getTagList(){
        api.tagList().then(res=>{
            const {code,data} = res
            if(code === 0){
                let newList = data.sort((a,b) => b.count - a.count).map(item=> item.name);
                newList = newList.slice(0,10);
                this.setState({
                    tagsList:newList
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
            category:this.category,
            tag:this.tag,
        };
        let hashName;
        if(!this.state.isCreate) {
            Object.assign(params,{id:this.props.location.state.id});
            hashName = UPDATE
        }else {
            hashName = CREATE
        }
        api[hashName](params).then(res=>{
            const {code,data,msg} = res;
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
            }else {
                message.error(msg)
            }
        })
    };
    categorySelect = (value)=>{
        this.category = value.join()
    };
    tagsSelect = (value) =>{
        this.tag = value.join()
    };

    render() {
        const {value,title,categoryList,isCreate,tagsList} = this.state
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
                    <span>分类:</span><TnTags type='radio' selectFn={(e)=>this.categorySelect(e)} list={categoryList}/>
                </div>
                <div className="title">
                    <span>标签:</span><TnTags type='checkbox' selectFn={(e)=>this.tagsSelect(e)} list={tagsList}/>
                </div>
                <br/>
                <textarea id="editor" defaultValue={value} />
                <Button onClick={this.handleSubmit} type="primary">
                    {isCreate ? '创建' : '更新'}
                </Button>
                <BackTop />
            </div>
        )
    }
}

export default edit
