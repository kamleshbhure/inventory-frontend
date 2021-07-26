import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { doSocialLogin } from '../state/auth/authActions';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if (token) {
            this.props.doSocialLogin(token);
            return <Redirect to={{
                pathname: "/admin",
                state: { from: this.props.location }
            }}/>; 
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.auth.authenticated,
        currentUser: state.auth.currentUser,
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        doSocialLogin: loginRequest => dispatch(doSocialLogin(loginRequest))
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(OAuth2RedirectHandler))
  