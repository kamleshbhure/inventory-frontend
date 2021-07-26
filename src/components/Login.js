import React, { Component } from 'react';
import '../css/Login.css';
import { Link, Redirect, withRouter } from 'react-router-dom'
import Alert from 'react-s-alert';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';

const centerAlign = {
    textAlign: 'center'
}
class Login extends Component {
    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }
    
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
           
            <main className="form-signin"  style={centerAlign}>
                <LoginForm {...this.props} />
                <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.auth.authenticated,
        currentUser: state.auth.currentUser,
    }
  }
  
  export default connect(
    mapStateToProps
  )(withRouter(Login))
