import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import logger from 'redux-logger';
import queryString from 'query-string';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import registerServiceWorker from './registerServiceWorker';
import App from './app/App';
import { Login, Logout, AuthUtils,Register,ForgotPassword,ResetPassword} from './auth';

import reducers from './reducers';
import Footer from './app/footer/Footer';
import Header from './app/header/Header';
import HomePageContainer from './app/homePage/HomePageContainer';
import UserGroupHomePage from './userGroup/UserGroupHomePage';
import {AUTH_USER} from './auth/AuthConstants'
import {SET_GROUP_NAME} from './actions/index';
import naksha from 'naksha-react-ui'

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


const footerRoutes = ["/", "/group/:groupName/login", "/login","/logout","/register","/register/forgotPassword",
"/register/resetPassword","/map"];
ReactDOM.render(
  <MuiThemeProvider>
  <Provider store={store}>
    <BrowserRouter forceRefresh={true}>
      <div className="container-fluid">
          <div id="headerWrapper">
              <Header title={"IBP"}/>
          </div>
          <div id="contentWrapper">
              <div id="content">
                  <Route exact path="/" component={HomePageContainer} />
                  <Route exact path="/observation/list" component={App} props={search2} />
                  <Route  path="/group/:groupName/observation" component={App} />
                  <Route  path="/group/:groupName/login" component={Login} />
                  <Route path="/login" component={Login}/>
                  <Route exact path="/logout" component={Logout} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/register/forgotPassword" component={ForgotPassword} />
                  <Route exact path="/register/resetPassword" component={ResetPassword} />
                  <Route exact path="/map" component={naksha.Layers} />
              </div>
              {footerRoutes.map((routes,index)=>{
                return(
                  <div key={index} id="footerWrapper">
                  <Route exact path={routes} component={Footer} />
                  </div>
                )
              })}
         </div>
      </div>
    </BrowserRouter>
  </Provider>
</MuiThemeProvider>
  , document.querySelector('.outer-wrapper'));
registerServiceWorker();
