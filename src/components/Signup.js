import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { GOOGLE_AUTH_URL } from '../index';
import { signup } from '../util/APIUtils';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';

class Signup extends Component {
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <main className="form-signin" >
                <SocialSignup />
                <SignupForm {...this.props} />
                <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
            </main>
        );
    }
}

const centerAlign = {
    textAlign: 'center'
}

class SocialSignup extends Component {
    
    render() {
        return (
            <div style={centerAlign}>
                <a className="btn btn-block btn-social btn-google" href={GOOGLE_AUTH_URL}>
                    <span className="fa fa-google"></span> Sign in with Google
                </a>
                <hr />
            </div>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        console.log("Debug::"+inputName+'::'+inputValue);
        this.setState({
            [inputName] : inputValue
        });        
    }

    handleSubmit = (event) => {
        event.preventDefault();   

        const signUpRequest = Object.assign({}, this.state);

        signup(signUpRequest)
        .then(response => {
            Alert.success("You're successfully registered. Please login to continue!");
            this.props.history.push("/login");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group ">
                    <label htmlFor="name">Name</label>
                    <input type="name" id="name" name="name" 
                        className="form-control" placeholder="Name"
                        value={this.state.name} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-group ">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="text" name="email" id="email" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Password</label>
                    <input type="password" name="password" 
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>                    

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
)(withRouter(Signup))
