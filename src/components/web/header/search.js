import React, {Component} from 'react';
import { Input, Icon } from 'antd'

class Search extends Component{
    state ={keyword:''}
    handleChange =(e)=>{
        this.setState({
            keyword: e.target.value
        })
    }
    handleSubmit = (e)=>{
        console.log(e);
    };
    handlePressEnter =(e)=>{
        console.log(e);
    }
    render() {
        return(
            <div id="header-search">

                <Input
                    type="text"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                    onBlur={this.handleSubmit}
                    onPressEnter={this.handlePressEnter}
                    className="search"
                    placeholder="搜索文章"
                    style={{ width: 200 }}
                />

                <Icon type="search" className="icon-search" style={{fontSize:'18px',color:'#969696'}} />
            </div>

        )
    }
}

export default Search
