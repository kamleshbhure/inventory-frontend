import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'
import productReducer from './product/productReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer
})

export default rootReducer
