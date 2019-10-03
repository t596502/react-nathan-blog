import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class AuthorizedRoute extends React.Component {

    render() {
        // const { component: Component, auth, ...rest } = this.props;
        const { render: Component, auth, ...rest } = this.props;

        return (
            <Route {...rest} render={props => {
                return auth === 10
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            }} />
        )
    }
}

const stateToProps = ({ user }) => ({
    auth: user.auth
});
export default connect(stateToProps,null)(AuthorizedRoute)
