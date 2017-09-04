import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import logger from 'redux-logger';
import App from './components/app';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import HomePage from './components/home_page';
import Single_Obj_Show from './components/Observation_Show/single_show';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import {AUTH_USER} from './actions'
import {
  BrowserRouter,
   Route
  } from 'react-router-dom';

  import history from './history';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk,ReduxPromise,logger)(createStore);

let store=createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
const userData=JSON.parse(localStorage.getItem('token'));
// If we have a token, consider the user to be signed in
if (token) {
  store.dispatch({ type: AUTH_USER,payload:userData});
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <div>
        <Header title={"IBP"}/>
        <div className="container-fluid">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/observation/list" component={App} />
          <Route exact path="/login" component={Signin} />
          <Route exact path="/signout" component={Signout} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/observation/show/:id" component={Single_Obj_Show} />
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
registerServiceWorker();
