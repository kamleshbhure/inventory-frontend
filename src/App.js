import './App.css';
import './css/bootstrap.min.css';
import {
  Route,
  Switch
} from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import NotFound from './components/NotFound';
import LoadingIndicator from './components/LoadingIndicator';
import PrivateRoute from './components/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import { Component } from 'react';
import configureStore from './state/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import AdminPortal from './components/AdminPortal';

const {store, persistor} = configureStore()

class App extends Component {
  render() {
    if(this.props.loading) {
      return <LoadingIndicator />
    }

    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingIndicator/>} persistor={persistor}>
            <div className="app">
              <div className="app-top-box">
                <AppHeader />
              </div>
              <div className="container-fluid">
                <div className="row">
                  <Switch>
                      <Route exact path="/" >
                          <Home/>
                      </Route>
                      <Route path="/signup">
                          <Signup />
                      </Route>
                      <Route path="/login">
                          <Login />
                      </Route>
                      <Route path="/admin">
                          <AdminPortal />
                      </Route>
                      <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
                      <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                      <Route component={NotFound}></Route>
                  </Switch>
                </div>
              </div>
              <Alert stack={{limit: 3}} 
                timeout = {3000}
                position='top-right' effect='slide' offset={65} />
            </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
