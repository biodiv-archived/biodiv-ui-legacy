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
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import UserGroupHomes from './components/UserGroupHomes/userGroup';
import UserGroup from './components/UserGroupHomes/index';
import  queryString from 'query-string';

import {AUTH_USER} from './actions'
import {
  BrowserRouter,
   Route,
   Switch
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
const Test=()=>{
  return(
  <div>
<h1>hfds</h1>
  </div>
  )
}
const newparams=  queryString.parse(document.location.search);
let search1=queryString.stringify(newparams);

 let search2 = decodeURIComponent( search1 );

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <div>
        <Header title={"IBP"}/>
        <div className="container-fluid">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/observation/list" component={App} props={search2} />
          <Route exact path="/login" component={Signin} />
          <Route exact path="/signout" component={Signout} />
          <Route  exact path="/group" component={Test} />
          <Route  exact path="/group/:groupName" component={UserGroup} />
          <Route  exact path="/group/:groupName/observation/list" component={UserGroupHomes} />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
registerServiceWorker();
