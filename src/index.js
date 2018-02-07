import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import logger from 'redux-logger';
import queryString from 'query-string';
import Cookies from 'universal-cookie';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reactTimeAgo from 'react-time-ago'
import javascriptTimeAgo from 'javascript-time-ago'

import registerServiceWorker from './registerServiceWorker';
import App from './app/App';
import { Login, Logout, AuthUtils} from './auth';

import reducers from './reducers';
import Footer from './app/footer/Footer';
import Header from './app/header/Header';
import HomePageContainer from './app/homePage/HomePageContainer';
import UserGroupHomePage from './userGroup/UserGroupHomePage';
import {AUTH_USER} from './auth/AuthConstants'
import {SET_GROUP_NAME} from './actions/index';
import naksha from 'naksha-react-ui'

javascriptTimeAgo.locale(require('javascript-time-ago/locales/en'))
javascriptTimeAgo.locale(require('javascript-time-ago/locales/ru'))

require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')
require('intl-messageformat/dist/locale-data/ru')
require('dotenv').config()



const createStoreWithMiddleware = applyMiddleware(ReduxThunk,ReduxPromise)(createStore);

/*
Let the user login always
*/

let store = createStoreWithMiddleware(reducers);
if (AuthUtils.isLoggedIn()) {
  store.dispatch({ type: AUTH_USER});
}

const newparams =  queryString.parse(document.location.search);
let search1=queryString.stringify(newparams);
let search2 = decodeURIComponent( search1 );

/*
For generating group level urls
Now group level avaialble in global state if group context is set
*/


let groupName= document.location.pathname.split("/")[2];
let groupsyntax=document.location.pathname.split("/")[1];

if(groupsyntax==='group' && groupName!=null){
  store.dispatch({type:SET_GROUP_NAME,payload:groupName})
}
else{
  store.dispatch({type:SET_GROUP_NAME,payload:""})
}



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter forceRefresh={true}>
      <div>
        <Header title={"IBP"}/>
        <div className="container-fluid">
          <Route exact path="/" component={HomePageContainer} />
          <Route exact path="/observation/list" component={App} props={search2} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout" component={Logout} />
          <Route  path="/group/:groupName/observation" component={App} />
          <Route exact path="/map" component={naksha.Layers} />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
registerServiceWorker();
