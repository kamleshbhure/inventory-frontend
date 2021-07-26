import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { doLogout } from '../state/auth/authActions';

function AppHeader(props) {
    const logoutHandler = () => {
        props.doLogout();
        props.history.push("/")
    }
    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#!">Inventory Portal</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            { props.authenticated ? (
                        <ul className="nav nav-pills col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><NavLink className="nav-link px-2 link-primary active" to="/admin">Admin Panel</NavLink></li>
                            <li><a className="nav-link px-2 text-white" href="#!" onClick={logoutHandler}>Sign out</a></li>
                        </ul>) : ''
                    }

                    { props.currentUser? (
                        <div className="dropdown text-end " style={{right: '25px'}}>
                            <a href="#" className="d-block text-white text-decoration-none dropdown-toggle"
                                id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    { props.currentUser.imageUrl ? (
                                            <img src={props.currentUser.imageUrl} alt={props.currentUser.name}  width="32" height="32" className="rounded-circle"/>
                                        ) : (
                                            <span>{props.currentUser.name && props.currentUser.name[0]}</span>
                                        )
                                    }
                            </a>
                            <ul className="dropdown-menu text-small" style={{left: '-120px'}} aria-labelledby="dropdownUser1">
                                <li>
                                    <NavLink className="dropdown-item" to="/profile">Profile</NavLink>
                                </li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="#!" onClick={logoutHandler}>Sign out</a></li>
                            </ul>
                        </div>
                    ) : ''
                    }
        </header>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.auth.authenticated,
        currentUser: state.auth.currentUser
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        doLogout: () => dispatch(doLogout())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AppHeader))