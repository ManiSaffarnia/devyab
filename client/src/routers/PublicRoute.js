import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
    component: Component,
    isAuthenticate,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            isAuthenticate ? (
                <Redirect to="/dashboard" />
            ) : (
                    <Component {...props} />
                )
        )} />
    );


const mapStateToProps = (state) => ({
    isAuthenticate: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PublicRoute);