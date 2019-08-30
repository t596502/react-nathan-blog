import React, {Component} from 'react'
import './index.less'
import {withRouter} from 'react-router-dom'

import {Divider, Tag, Icon} from 'antd'


@withRouter
class BolgSider extends Component {

    searchTag = (category) => {
        this.props.history.push(`/?page=1&category=${category}`)
    }

    render() {
        const {hotList, categoryList} = this.props;
        return (
            <div className="sider-wrapper">
                <img
                    src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558009723215&di=ac185a0bc5712cff3349ccc8b0c588dd&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F25%2F12%2F61%2Fpic_lib%2Fs960x639%2Fawrbz_27s960x639.jpg'
                    className="sider-avatar" alt=""/>
                <h2 className="name">Nathan</h2>
                <div className="title">前端探索</div>
                <ul className="link-list">
                    <li>
                        <Icon type="github"/>
                        <a target="_blank" rel="noreferrer noopener" href="https://github.com/t596502">
                            github
                        </a>
                    </li>
                    <li>
                        <i className="iconfont icon-juejin"/>
                        <a target="_blank" rel="noreferrer noopener"
                           href="https://juejin.im/user/5b4e8d74e51d4519475f2471">
                            juejin
                        </a>
                    </li>
                </ul>

                <Divider>
                    <Icon type='fire'/>
                    <span style={{marginLeft:'3px'}}>
                    热门文章
                    </span>
                </Divider>
                <ul className="recent-list">
                    {hotList.length ? hotList.map((item, index) => {
                        return (index < 5 &&
                            <li onClick={() => this.props.jumpTo(item.id)} key={item.created_at}>
                                <a href="javascript:;">{item.title}</a>
                            </li>
                        )
                    }) : <li>暂无数据</li>}
                </ul>
                <Divider>
                    <Icon type="folder" />
                    <span style={{marginLeft:'3px'}}>
                    分类
                    </span>
                </Divider>
                <div className="tags-content">
                    {categoryList.length ? categoryList.map((item, index) => (
                        <Tag onClick={() => this.searchTag(item)} className='tags' key={index} color={'#eee'}>
                            <a href="javascript:;">{item}</a>
                        </Tag>
                    )) : ''}
                </div>
            </div>
        )
    }
}

export default BolgSider
