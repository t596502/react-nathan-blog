import React, {Component} from 'react';
import { Input, Icon } from 'antd'
import { withRouter } from 'react-router-dom'

@withRouter
class Search extends Component{
    state ={keyword:''}
    handleChange =(e)=>{
        this.setState({
            keyword: e.target.value
        })
    };
    onBlur = (e)=>{
    };
    handlePressEnter =()=>{
        const {keyword} = this.state
        if(keyword) this.props.history.push(`/?page=1&title=${keyword}`)
        else this.props.history.push(`/`)
    };
    render() {
        return(
            <div id="header-search">

                <Input
                    type="text"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                    onBlur={this.onBlur}
                    onPressEnter={this.handlePressEnter}
                    className="search"
                    placeholder="搜索文章"
                    style={{ width: 200 }}
                />

                <Icon type="search" onClick={this.handlePressEnter} className="icon-search" style={{fontSize:'18px',color:'#969696'}} />
            </div>

        )
    }
}

export default Search
