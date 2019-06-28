import "naksha-components-react/dist/index.css";
import "./index.css";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import queryString from "query-string";
import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import ReduxPromise from "redux-promise";
import ReduxThunk from "redux-thunk";

import { LOAD_LOCALE, SET_GROUP_NAME, SET_LOCALE } from "./actions";
// import { ForgotPassword, Login, Logout, Register, ResetPassword, VerifyRegistration } from "./auth";
import { AUTH_USER } from "./auth/AuthConstants";
import { Config } from "./Config";
import en from "./en.js";
import fr from "./fr.js";
import LoadingComponent from "./loadingComponent";
import reducers from "./reducers";
import { unregister } from "./registerServiceWorker";

import AuthUtils from "./auth/AuthUtils";

// ---Dynamic Imports---

const ForgotPassword = Loadable({
  loader: () => import("./auth/ForgotPassword"),
  loading: LoadingComponent,
});

const Login = Loadable({
  loader: () => import("./auth/Login"),
  loading: LoadingComponent,
});

const Logout = Loadable({
  loader: () => import("./auth/Logout"),
  loading: LoadingComponent,
});

const Register = Loadable({
  loader: () => import("./auth/Register"),
  loading: LoadingComponent,
});

const ResetPassword = Loadable({
  loader: () => import("./auth/ResetPassword"),
  loading: LoadingComponent,
});

const VerifyRegistration = Loadable({
  loader: () => import("./auth/VerifyRegistration"),
  loading: LoadingComponent,
});

const App = Loadable({
  loader: () => import("./app/App"),
  loading: LoadingComponent,
});

const HomePageContainer = Loadable({
  loader: () => import("./app/homePage/HomePageContainer"),
  loading: LoadingComponent,
});

const NakshaLibLayers = Loadable({
  loader: () => import("./nakshaLibLayers"),
  loading: LoadingComponent,
});

const NakshaLibUpload = Loadable({
  loader: () => import("./nakshaLibUpload"),
  loading: LoadingComponent,
});

var fileref = document.createElement("link");
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");

switch (Config.api.DEPLOY) {
  case "bbp":
    fileref.setAttribute("href", "/headerStyles/bbpHeaderStyle.css?v=2");
    break;
  case "wiktrop":
    fileref.setAttribute("href", "/headerStyles/wiktropHeaderStyle.css?v=2");
    break;
  default:
    fileref.setAttribute("href", "/headerStyles/headerstyle.css?v=2");
    break;
}

if (typeof fileref != "undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref);

let Header;
let Footer;

switch (Config.api.DEPLOY) {
  case "bbp":
    Header = require("./app/header/BbpHeader.js").default;
    Footer = require("./app/footer/BbpFooter.js").default;
    break;
  case "wiktrop":
    Header = require("./app/header/WiktropHeader.js").default;
    Footer = require("./app/footer/WiktropFooter.js").default;
    break;
  default:
    Header = require("./app/header/Header.js").default;
    Footer = require("./app/footer/Footer").default;
    break;
}

const createStoreWithMiddleware = applyMiddleware(ReduxThunk,ReduxPromise)(createStore);

/*
Let the user login always
*/
let store = createStoreWithMiddleware(reducers);

if (AuthUtils.isLoggedIn()) {
  store.dispatch({ type: AUTH_USER});
}


let language;
 if (navigator.languages !== undefined){
   language =  navigator.languages[0];
 } else {
   language =  navigator.language;
 }
//language = "fr";

if(language!=='fr' || Config.api.DEPLOY !=="wiktrop"){
    if(sessionStorage.locale){
      store.dispatch({type:SET_LOCALE,payload:sessionStorage.locale})
    }else{
      store.dispatch({type:SET_LOCALE,payload:"en"})
      sessionStorage.locale="en";
    }
}else{
    if(sessionStorage.locale){
      store.dispatch({type:SET_LOCALE,payload:sessionStorage.locale})
    }else{
      store.dispatch({type:SET_LOCALE,payload:"fr"})
      sessionStorage.locale="fr"
    }
}
if(store.getState().Locale ==="fr"){
   store.dispatch({type:LOAD_LOCALE,payload:fr})
}else{
  store.dispatch({type:LOAD_LOCALE,payload:en})
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
  if(parts[0]==="assambiodiversity"){
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
          <Component
            endpoint={
              process.env.REACT_APP_ROOT_URL + "/naksha/layer/uploadshp"
            }
            title={title}
          />
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

const RenderMap = () => (
  <div
    style={{
      height: "75vh",
      width: "100%"
    }}
  >
    <NakshaLibLayers
      mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
      endpoint={window.location.origin}
      layersPanelClosed={true}
    />
  </div>
)

ReactDOM.render(
  <MuiThemeProvider>
  <Provider store={store}>
    <BrowserRouter forceRefresh={true}  onUpdate={fireTracking()}>
      <>
          <div id="headerWrapper">
              <Header title={"IBP"}/>
          </div>
          <div id="contentWrapper">
              <div id="content">
                  <Route exact path="/" component={HomePageContainer} />
                  <Route exact path="/observation/list" component={App} props={search2} />
                  <Route  path="/group/:groupName/observation" render={(props) => <App {...props} title={title} />}/>
                  <Route  path="/group/:groupName/login" render={(props) => <Login {...props} title={title} />}/>
                  <Route  exact path="/group/:groupName/register/verifyRegistration" render={(props) => <VerifyRegistration {...props} title={title} />}/>
                  <Route  path="/group/:groupName/forgotPassword"  render={(props) => <ForgotPassword {...props} title={title} />}/>
                  <Route  path="/group/:groupName/resetPassword" render={(props) => <ResetPassword {...props} title={title} />}/>
                  <Route  path="/group/:groupName/register"  render={(props) => <Register {...props} title={title} />}/>
                  <Route  path="/login"  render={(props) => <Login {...props} title={title} />}/>
                  <Route  exact path="/logout"  render={(props) => <Logout {...props} title={title} />}/>
                  <Route  exact path="/register" render={(props) => <Register {...props} title={title} />}/>
                  <Route  exact path="/register/verifyRegistration" render={(props) => <VerifyRegistration {...props} title={title} />}/>
                  <Route  exact path="/register/forgotPassword" render={(props) => <ForgotPassword {...props} title={title} />}/>
                  <Route  exact path="/register/resetPassword" render={(props) => <ResetPassword {...props} title={title} />}/>

                  <Route path={["/group/:groupName/map", "/group/:groupName/map/show"]} render={RenderMap}/>
                  <Route exact path={["/map", "/map/show"]} render={RenderMap}/>

              <PrivateRoute exact path="/map/upload" component={NakshaLibUpload}/>

              </div>
                <div  id="footerWrapper">
              {footerRoutes.map((routes,index)=>{
                return(
                  <Route key={index} exact path={routes} component={Footer} />
                )
              })}
                </div>
         </div>
      </>
    </BrowserRouter>
  </Provider>
</MuiThemeProvider>
  , document.querySelector('.outer-wrapper'));
unregister();
