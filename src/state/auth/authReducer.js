import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE
} from './authTypes'

import Alert from 'react-s-alert';

const initialState = {
  loading: false,
  authenticated: false,
  currentUser: null,
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        currentUser: action.payload,
        error: ''
      }
    case LOGIN_FAILURE:
      Alert.error((action.payload && action.payload.message) || 'Oops! Something went wrong. Please try again!');
      return {
        loading: false,
        authenticated: false,
        currentUser: null,
        error: action.payload
      }
    case LOGOUT_REQUEST:
      return {
        loading: false,
        authenticated: false,
        currentUser: null,
        error:''
      }
    case GET_CURRENT_USER_REQUEST:
        return {
          ...state,
          loading: true
        }
    
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: ''
      }
    
    case GET_CURRENT_USER_FAILURE:
      return {
        loading: false,
        currentUser: null,
        error: action.payload
      }
    default: return state
  }
}

export default reducer
