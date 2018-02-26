import axios from 'axios';
import queryString from 'query-string';

import { Config } from '../Config';
import * as AuthConstants from  './AuthConstants';
import loginService from './LoginService';

export function login({ email, password }) {
    return function(dispatch) {
        let config = Config.api.login.default;
        config.data = queryString.stringify({username : email, password : password}) ;
        axios(config).then(response => {
            console.log("got response from login api")
            loginService.clearCredentials();
            loginService.setCredentials(response.data);
            dispatch({ type: AuthConstants.AUTH_USER, payload:response});
        }).catch(function(error){
            if(error.response && error.response.data)
                dispatch(authError(error.response.data.message));
            else
                dispatch(authError(error.response));
        });
    }
}

export function logout() {
    return function(dispatch) {
        let config = Config.api.logout.default;
        config.params={
          refresh_token:loginService.getRefreshToken()
        }
        //console.log("headers",config);
        axios(config).then(response => {
            //console.log("got response from logout api")
            loginService.clearCredentials();
            dispatch({ type: AuthConstants.UNAUTH_USER});
            window.location.reload(true);
        }).catch(function(error){
            console.log(error);
            if(error.response && error.response.data)
                dispatch(authError(error.response.data.message));
            else
                dispatch(authError(error.response));
        });
    }
}

export function getNewAccessToken() {
    var rToken = loginService.getRefreshToken();
    //return function(dispatch) {
        let config = Config.api.login.token;
        config.data = queryString.stringify({grant_type:'access_token', 'refresh_token': rToken}) ;
    return axios(config).then(response => {
            console.log("got response from token api")
            loginService.clearCredentials();
            loginService.setCredentials(response.data);
            return { type: AuthConstants.AUTH_USER, payload:response};
        }).catch(function(error){
            if(error.response && error.response.data)
                return authError(error.response.data.message);
            else
                return authError(error.response);
        });
    //}
}

export function authError(error) {
  return {
    type: AuthConstants.AUTH_ERROR,
    payload: error
  };
}
