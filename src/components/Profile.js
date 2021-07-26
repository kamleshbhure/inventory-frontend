import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import '../css/Profile.css';

function Profile(props) {
    return (
        <div className="profile-container">
            <div className="container">
                <div className="profile-info">
                    <div className="profile-avatar">
                        { 
                            props.currentUser.imageUrl ? (
                                <img src={props.currentUser.imageUrl} alt={props.currentUser.name}/>
                            ) : (
                                <div className="text-avatar">
                                    <span>{props.currentUser.name && props.currentUser.name[0]}</span>
                                </div>
                            )
                        }
                    </div>
                    <div className="profile-name">
                        <h2>{props.currentUser.name}</h2>
                        <p className="profile-email">{props.currentUser.email}</p>
                    </div>
                </div>
            </div>    
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.auth.authenticated,
        currentUser: state.auth.currentUser,
    }
}

export default connect(
    mapStateToProps
)(withRouter(Profile))
