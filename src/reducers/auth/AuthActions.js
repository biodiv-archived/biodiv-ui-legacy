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
            var i;
            for (i = 0; i < localStorage.length; i++)   {
                console.log("beforeSetr",localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
            }
            loginService.setCredentials(response.data);
            for (i = 0; i < localStorage.length; i++)   {
                console.log("afterSet",localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
            }
            dispatch({ type: AuthConstants.AUTH_USER, payload:response});
        }).catch(function(error){
            console.log(error);
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
        console.log("headers",config);
        axios(config).then(response => {
            console.log("got response from logout api")
            loginService.clearCredentials();
            var i;
            console.log("aTokennnnnnnnnnnnnnnnnn",localStorage.length)
            for (i = 0; i < localStorage.length; i++)   {
                console.log("after clear in logout function",localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
            }
            dispatch({ type: AuthConstants.UNAUTH_USER});
        }).catch(function(error){
            console.log(error);
            if(error.response && error.response.data)
                dispatch(authError(error.response.data.message));
            else
                dispatch(authError(error.response));
        });
    }
}

export function authError(error) {
  return {
    type: AuthConstants.AUTH_ERROR,
    payload: error
  };
}
