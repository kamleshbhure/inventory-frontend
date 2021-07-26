import { ACCESS_TOKEN } from '../..';
import { getCurrentUser, login } from '../../util/APIUtils';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_REQUEST
} from './authTypes'
import Alert from 'react-s-alert';

//Login action
export const doLogin = (loginForm) => {
  return (dispatch) => {
    dispatch(loginRequest())
    login(loginForm).then(response => {
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
      Alert.success("You're successfully logged in!");
      getCurrentUser()
        .then(response => {
          dispatch(loginSuccessful(response));
        }).catch(error => {
          dispatch(loginFailure(error));
        });
    }).catch(error => {
      dispatch(loginFailure(error))
    });
  }
}

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const loginSuccessful = response => {
  return {
    type: LOGIN_SUCCESS,
    payload: response
  }
}

export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}

//Logout action
export const doLogout = (request) => {
  return (dispatch) => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(logoutRequest(request))
  }
}

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  }
}

export const getCurrentUserProfile = (request) => {
  return (dispatch) => {
    dispatch(getCurrentUserRequest(request))
    getCurrentUser()
      .then(response => {
        dispatch(getCurrentUserSuccess(response));
      }).catch(error => {
        dispatch(getCurrentUserFailure(error));
      });
  }
}

export const getCurrentUserRequest = () => {
  return {
    type: GET_CURRENT_USER_REQUEST
  }
}

export const getCurrentUserSuccess = response => {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    payload: response
  }
}

export const getCurrentUserFailure = error => {
  return {
    type: GET_CURRENT_USER_FAILURE,
    payload: error
  }
}

export const doSocialLogin = (token) => {
  return (dispatch) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    getCurrentUser()
      .then(response => {
        dispatch(loginSuccessful(response));
        Alert.success("You're successfully logged in!");
      }).catch(error => {
        dispatch(loginFailure(error));
      });
  }
}
