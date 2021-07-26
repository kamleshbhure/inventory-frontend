import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';

class Home extends Component {
    render() {
        
        return (
            this.props.authenticated ? (
                <Redirect to={{
                    pathname: "/profile",
                    state: { from: this.props.location }
                }}/>
            ) : (
                <div className="card text-center">
                    <div className="card-header">
                        Inventory Management System
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Spring Boot + ReactJS practice Program</h5>
                        <p className="card-text">This is practice assignement to understand basic and advance concepts of 
                        Spring boot and ReactJS using microservices. ReactJS Technology used are Hooks, Redux and Formik</p>
                        <a href="/login" className="btn btn-primary">Login</a>
                    </div>
                </div>
            )
        )
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
)(withRouter(Home))
