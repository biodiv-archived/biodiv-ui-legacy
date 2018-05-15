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
import {Config} from './Config'
import registerServiceWorker from './registerServiceWorker';
import App from './app/App';
import { Login, Logout, AuthUtils,Register,ForgotPassword,ResetPassword} from './auth';
import {fetchUserGroupList,fetchSpeciesGroup,fetchLanguages} from './actions/index';


import reducers from './reducers';




import HomePageContainer from './app/homePage/HomePageContainer';
import UserGroupHomePage from './userGroup/UserGroupHomePage';
import {AUTH_USER} from './auth/AuthConstants'
import {SET_GROUP_NAME} from './actions/index';
import naksha from 'naksha-react-ui'
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';

var fileref=document.createElement("link")
       fileref.setAttribute("rel", "stylesheet")
       fileref.setAttribute("type", "text/css")

       if(Config.api.DEPLOY==="ibp"){
         fileref.setAttribute("href", Config.api.ROOT_URL+"/headerStyles/headerstyle.css")
       }else{
         fileref.setAttribute("href", Config.api.ROOT_URL+"/headerStyles/bbpHeaderStyle.css")
       }

       console.log("typeOf",typeof fileref)
       if (typeof fileref!="undefined")
               document.getElementsByTagName("head")[0].appendChild(fileref)


let Header;
if(Config.api.DEPLOY==="ibp"){
    Header = require('./app/header/Header.js').default;
}else{
    Header = require('./app/header/BbpHeader.js').default;
}

let Footer;
if(Config.api.DEPLOY==="ibp"){
    Footer = require('./app/footer/Footer').default;
}else{
    Footer = require('./app/footer/BbpFooter.js').default;
}


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

var softBounds = undefined;
var hardBounds = Config.map.RESTRICTED_EXTENT
var groupContext = null;

let fullUrl = window.location.host;
let parts=fullUrl.split(".");
if(parts.length>=3){
  if(parts[0]=="assambiodiversity"){
    groupContext = parts[0];
    hardBounds = [[88, 23], [97, 29]];
  }
}

const map_props = {
	softBounds: softBounds, // TODO: fetch bounds from userGroup // [[92, 10], [102, 29]], // bounds to initialize the map
	hardBounds: hardBounds, // bounds to restrict the map
	contextUrl:window.location.host,
	groupName: groupContext
}

const footerRoutes = ["/", "/group/:groupName/login", "/login","/logout","/register","/register/forgotPassword",
"/register/resetPassword"];


const history = createHistory();
ReactGA.initialize('UA-3185202-1');

function fireTracking() {
  //console.log("fileTracking",window.location.pathname,window.location.search)
 	//const { pathname } = nextState.location // this gives you the next URL
  ReactGA.pageview(window.location.pathname + window.location.search);

}
// console.log(history)
//   history.listen((location,action) =>{
//     console.log("agadadad",location.pathname)
//     //ReactGA.pageview(window.location.pathname + window.location.search);
//   }
//
// );

ReactDOM.render(
  <MuiThemeProvider>
  <Provider store={store}>
    <BrowserRouter forceRefresh={true} onUpdate={fireTracking()}>
      <div className="container-fluid">
          <div id="headerWrapper">
              <Header title={"IBP"}/>
          </div>
          <div id="contentWrapper">
              <div id="content">
                  <Route exact path="/" component={HomePageContainer} history={history}/>
                  <Route exact path="/observation/list" component={App} props={search2} history={history}/>
                  <Route  path="/group/:groupName/observation" component={App} history={history}/>
                  <Route  path="/group/:groupName/login" component={Login} history={history}/>
                  <Route path="/login" component={Login} history={history}/>
                  <Route exact path="/logout" component={Logout} history={history}/>
                  <Route exact path="/register" component={Register} history={history}/>
                  <Route exact path="/register/forgotPassword" component={ForgotPassword} history={history}/>
                  <Route exact path="/register/resetPassword" component={ResetPassword} history={history}/>
                  <Route exact path="/map" render={(routeProps) => (
						      							<naksha.Layers {...routeProps} {...map_props} />
							    				  )}/>

              </div>
                <div  id="footerWrapper">
              {footerRoutes.map((routes,index)=>{
                return(
                  <Route key={index} exact path={routes} component={Footer} />
                )
              })}
                </div>
         </div>
      </div>
    </BrowserRouter>
  </Provider>
</MuiThemeProvider>
  , document.querySelector('.outer-wrapper'));
registerServiceWorker();
