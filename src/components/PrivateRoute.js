import React from 'react';
import { connect } from 'react-redux';
import {
    Route,
    Redirect,
    withRouter
  } from "react-router-dom";
  
  
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
);
  
const mapStateToProps = (state, ownProps) => {
  return {
      authenticated: state.auth.authenticated,
      currentUser: state.auth.currentUser,
  }
}

export default connect(
  mapStateToProps
)(withRouter(PrivateRoute))
