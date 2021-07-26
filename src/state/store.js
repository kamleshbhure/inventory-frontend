import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './rootReducer'

const persistConfig = {
  key: 'root',
  storage
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = composeWithDevTools(applyMiddleware(logger, thunk));
 
export default () => {
  const store = createStore(persistedReducer, middleware)
  const persistor = persistStore(store)
  return { store, persistor }
}
