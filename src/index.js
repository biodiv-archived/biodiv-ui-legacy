import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import logger from 'redux-logger';
import  queryString from 'query-string';
import Cookies from 'universal-cookie';

import registerServiceWorker from './registerServiceWorker';
import App from './app/App';
import { Login, Logout} from './auth';
import AuthUtils from './auth/AuthUtils';

import reducers from './reducers';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import HomePageContainer from './app/HomePageContainer';
import UserGroupHomes from './components/UserGroupHomes/userGroup';
import UserGroup from './components/UserGroupHomes/index';
import {AUTH_USER} from './auth/AuthConstants'
import {
  BrowserRouter,
   Route,
   Switch
  } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk,ReduxPromise,logger)(createStore);

let store = createStoreWithMiddleware(reducers);
if (AuthUtils.isLoggedIn()) {
  store.dispatch({ type: AUTH_USER});
}

const newparams =  queryString.parse(document.location.search);
let search1=queryString.stringify(newparams);
let search2 = decodeURIComponent( search1 );

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter  forceRefresh={true}>
      <div>
        <Header title={"IBP"}/>
        <div className="container-fluid">
          <Route exact path="/" component={HomePageContainer} />
          <Route exact path="/observation/list" component={App} props={search2} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout" component={Logout} />
          <Route  exact path="/group/:groupName/observation/list" component={App} />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
registerServiceWorker();
