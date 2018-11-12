import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticate, ...rest }) => (
    <Route {...rest} component={(props) => (
        isAuthenticate ? (
            <React.Fragment>
                <Component {...props} />
            </React.Fragment>
        ) : (
                <Redirect to="/login" />
            )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticate: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);