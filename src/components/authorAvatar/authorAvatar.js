import React, {Component} from 'react'
import {Avatar} from 'antd'
import {connect} from "react-redux";

@connect(
    state => ({
        authorInfo: state.user.authorInfo,
    }),
    null
)
class AuthAvatar extends Component {

    render() {
        const {authorInfo} = this.props;
        return (
            <Avatar src={authorInfo.avatar}/>
        )
    }
}


export default AuthAvatar
