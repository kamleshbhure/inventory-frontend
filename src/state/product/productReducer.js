import { 
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAILURE,
    PRODUCT_CREATE,
    PRODUCT_UPDATE,
    PRODUCT_DELETE,
    PRODUCT_DELETE_FAILURE, 
    PRODUCT_SAVE_FAILURE
  } from './productTypes';  

import Alert from 'react-s-alert';

const initialState = {
    loading: false,
    products: {},
    error: ''
  }

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case PRODUCT_REQUEST:
        return {
          ...state,
          loading: true
        }
      case PRODUCT_SUCCESS:
        return {
          loading:false,
          products: action.payload,
          error: ''
        }
      case PRODUCT_FAILURE:
        Alert.error((action.payload && action.payload.message) || 'Oops! Something went wrong. Please try again!');
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case PRODUCT_CREATE:
            return {
              ...state,
              products: [...state.products, action.payload],
              loading: true
            }
        case PRODUCT_UPDATE:
            return {
              ...state,
              products: state.products.map((product) => {
                  if (product.id === action.payload.id) {
                      return {
                          ...product,
                          ...action.payload,
                      }
                  } else {
                      return product
                  }
              }),
              loading: true
            };
        case PRODUCT_SAVE_FAILURE:
            Alert.error((action.payload && action.payload.message) || 'Oops! Something went wrong. Please try again!');
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case PRODUCT_DELETE:
            return {
                ...state,
                products: state.products.filter(({ id }) => id !== action.payload)
            }
        case PRODUCT_DELETE_FAILURE:
            Alert.error((action.payload && action.payload.message) || 'Oops! Something went wrong. Please try again!');
            return {
                ...state,
                loading: false,
                error: action.payload
            }
      default: return state
    }
}

export default reducer
