import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import logger from 'redux-logger';
import queryString from 'query-string';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Config} from './Config'
import registerServiceWorker from './registerServiceWorker';
import App from './app/App';
import { Login, Logout, AuthUtils,Register,VerifyRegistration,ForgotPassword,ResetPassword} from './auth';
import {fetchUserGroupList,fetchSpeciesGroup,fetchLanguages} from './actions/index';
import reducers from './reducers';
import HomePageContainer from './app/homePage/HomePageContainer';
import UserGroupHomePage from './userGroup/UserGroupHomePage';
import {AUTH_USER} from './auth/AuthConstants'
import {SET_GROUP_NAME,LOAD_LOCALE} from './actions/index';
import naksha from 'naksha-react-ui'
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
// import fr from './fr.js';
import en from './en.js';
import fr from './fr.js';



var fileref=document.createElement("link")
       fileref.setAttribute("rel", "stylesheet")
       fileref.setAttribute("type", "text/css")

       if(Config.api.DEPLOY==="ibp"){
         fileref.setAttribute("href", Config.api.ROOT_URL+"/headerStyles/headerstyle.css")
       }else{
         fileref.setAttribute("href", Config.api.ROOT_URL+"/headerStyles/bbpHeaderStyle.css")
       }

       //console.log("typeOf",typeof fileref)
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

let language;
 if (navigator.languages != undefined){
   language =  navigator.languages[0];
 } else {
   language =  navigator.language;
 }



const createStoreWithMiddleware = applyMiddleware(ReduxThunk,ReduxPromise)(createStore);

/*
Let the user login always
*/

let store = createStoreWithMiddleware(reducers);
if (AuthUtils.isLoggedIn()) {
  store.dispatch({ type: AUTH_USER});
}
if(language==='en' || language==='en-GB' ||  language==='en-UK' || language==='en-US'){
  store.dispatch({type:LOAD_LOCALE,payload:en})
}
if(language==='fr'){
     store.dispatch({type:LOAD_LOCALE,payload:fr})
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
if(groupsyntax === "group" && groupName !== null){
  groupContext = groupName;
}else if(parts.length>=3){
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

window.map_hardbounds = hardBounds;

const footerRoutes = ["/", "/group/:groupName/login", "/login","/logout","/register","/register/forgotPassword",
"/register/resetPassword"];


const history = createHistory();
ReactGA.initialize(Config.api.TRACKING_CODE);

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
const title = Config.api.TITLE;

const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      AuthUtils.isLoggedIn() ? (
        AuthUtils.isAdmin()?
        (
          <Component {...props} {...map_props} title={title}/>
        )
        :
        (
          <Redirect
            to={{
              pathname: "/map",
              state: { from: props.location }
            }}
          />
        )

      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

ReactDOM.render(
  <MuiThemeProvider>
  <Provider store={store}>
    <BrowserRouter forceRefresh={true}  onUpdate={fireTracking()}>
      <div className="container-fluid">
          <div id="headerWrapper">
              <Header title={"IBP"}/>
          </div>
          <div id="contentWrapper">
              <div id="content">
                  <Route exact path="/" component={HomePageContainer} />
                  <Route exact path="/observation/list" component={App} props={search2} />
                  <Route  path="/group/:groupName/observation" render={(props) => <App {...props} title={title} />}/>
                  <Route  path="/group/:groupName/login" render={(props) => <Login {...props} title={title} />}/>
                  <Route  path="/group/:groupName/register"  render={(props) => <Register {...props} title={title} />}/>
                  <Route  path="/group/:groupName/forgotPassword"  render={(props) => <ForgotPassword {...props} title={title} />}/>
                  <Route  path="/group/:groupName/resetPassword" render={(props) => <ResetPassword {...props} title={title} />}/>
                  <Route  path="/login"  render={(props) => <Login {...props} title={title} />}/>
                  <Route  exact path="/logout"  render={(props) => <Logout {...props} title={title} />}/>
                  <Route  exact path="/register" render={(props) => <Register {...props} title={title} />}/>
                  <Route  exact path="/register/verifyRegistration" render={(props) => <VerifyRegistration {...props} title={title} />}/>
                  <Route  exact path="/register/forgotPassword" render={(props) => <ForgotPassword {...props} title={title} />}/>
                  <Route  exact path="/register/resetPassword" render={(props) => <ResetPassword {...props} title={title} />}/>

                  <Route path="/group/:groupName/map" render={(routeProps) => (
						      							<naksha.Layers {...routeProps} {...map_props} title={title}/>
							    				  )}/>
                  <Route exact path="/map" render={(routeProps) => (
          						      		<naksha.Layers {...routeProps} {...map_props} title={title}/>
          							    )}/>

                  <PrivateRoute exact path="/map/upload" component={naksha.NewLayerComponent}/>

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
