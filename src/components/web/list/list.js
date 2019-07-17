import {Divider, Icon} from "antd";
import React,{Component} from "react";


class ArticleList extends Component{

    render() {
        const {list} = this.props;
        return(
            <ul className="ul-list">
                {list.map(item => (
                    <li key={item.id} className="ul-list-item">
                        <Divider orientation="left">
                            <span className="title" onClick={() => this.props.jumpTo(item.id)}>{item.title}</span>
                        </Divider>

                        {/*<div*/}
                        {/*// onClick={() => this.jumpTo(item.id)}*/}
                        {/*className="article-detail description"*/}
                        {/*dangerouslySetInnerHTML={{ __html: item.content }}*/}
                        {/*/>*/}

                        <div className="list-item-action">
                            <Icon type="message" style={{ marginRight: 7 }} />
                            <span className="create-time">{item.created_at.slice(0, 10)}</span>

                            {/*{getCommentsCount(item.comments)}*/}
                            {/*<Tags type="tags" list={item.tags} />*/}
                            {/*<Tags type="categories" list={item.categories} />*/}
                        </div>
                    </li>
                ))}
            </ul>
        )
    }


}
export default ArticleList
