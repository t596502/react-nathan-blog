import React, {Component} from 'react'
import './index.less'

import {Link} from 'react-router-dom'

import {Divider, Tag, Icon} from 'antd'


class BolgSider extends Component {


    render() {
        const {hotList} = this.props;
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

                <Divider>热门文章</Divider>
                <ul className="recent-list">
                    {hotList.length ? hotList.map((item,index)=>{
                        return ( index < 5 &&
                            <li onClick={() => this.props.jumpTo(item.id)} key={item.id}>
                                <a href="javascript:;">{item.title}</a>
                            </li>
                        )
                    }) : <li>暂无数据</li>}
                </ul>
                <Divider>分类</Divider>
                <div className="tags-content">
                    {/*<Tag color={colorList[i] ? colorList[i] : colorList[random(colorList)]}>*/}

                    {/*</Tag>*/}
                </div>
            </div>
        )
    }
}

export default BolgSider
