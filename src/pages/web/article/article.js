import React, { Component } from 'react'

import {articleDetail} from "@/request/request";
import {translateMarkdown} from "@/lib";

class Article extends Component{
    state={
        detail:{}
    }
    componentWillMount() {
        const id = this.props.match.params.id
        console.log(id);
        this.getArticleDetail(id)
    }
    getArticleDetail(id){
        articleDetail({id}).then(res=>{
            const {code,msg,data} = res;
            if(code === 0 ){
                data.content = translateMarkdown(data.content)
                console.log(translateMarkdown);
                this.setState({
                    detail:data
                })
            }
        })
    }
    render() {
        const {detail} = this.state
        return(
            <div>
                console.log(222);
                <div className="article-detail" dangerouslySetInnerHTML={{ __html: detail.content }} />
            </div>
        )
    }
}

export default Article
