import axios from 'axios';

import LoginService from './auth/LoginService';
import AuthUtils from './auth/AuthUtils.js';

export let ROOT_URL;
export let PAMBA_API_ROOT_URL;
export let API_ROOT_URL;

if(process.env.NODE_ENV=="development" ){

//  ROOT_URL="http://hybrid.indiabiodiversity.org"
//  API_ROOT_URL="http://hybrid.indiabiodiversity.org/biodiv-api"
  ROOT_URL="https://hybrid.pamba.strandls.com"
  API_ROOT_URL="https://hybrid.pamba.strandls.com/biodiv-api"
    PAMBA_API_ROOT_URL="https://hybrid.pamba.strandls.com/biodiv-api";
    // API_ROOT_URL="https://api.pamba.strandls.com";
}

if(process.env.NODE_ENV=="kk" ){
    ROOT_URL="http://indiabiodiversity.org";
    PAMBA_API_ROOT_URL="https://indiabiodiversity.org/biodiv-api";
    API_ROOT_URL="https://indiabiodiversity.org/biodiv-api";
}
if(process.env.NODE_ENV=="production" ){


    ROOT_URL="https://hybrid.pamba.strandls.com";
    PAMBA_API_ROOT_URL="https://hybrid.pamba.strandls.com/biodiv-api";
    API_ROOT_URL="https://hybrid.pamba.strandls.com/biodiv-api"
}

axios.defaults.baseURL = ROOT_URL;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


axios.interceptors.request.use(function (config) {

//    console.log('---------------------BEFORE REQUEST START------------------------');
    var accessToken = LoginService.accessToken;
    if(accessToken) {
        //  console.log('Adding access token in axios header');
        //  config.headers = { 'X-AUTH-TOKEN' : accessToken};
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }
//    console.log('---------------------BEFORE REQUEST END------------------------');
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    //console.log('---------------------ON RESPONSE START------------------------');
  //  console.log(response);
  //  console.log('---------------------ON RESPONSE END------------------------');
    return response;
}, function (error) {
    return Promise.reject(error);
});


/**
 * Default configuration
 */
export let Config = {
    api:{
        API_ROOT_URL : API_ROOT_URL,
        PAMBA_API_ROOT_URL : PAMBA_API_ROOT_URL,
        ROOT_URL : ROOT_URL,
        login : {
            default : {
                method : 'post',
                baseURL:'',
                url :  API_ROOT_URL+'/login',
                headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
                data : {}
            },
            token : {
                method: 'post',
                baseURL:'',
                url : API_ROOT_URL+'/token'
            }
        },
        logout : {
            default : {
                method : 'get',
                url :  API_ROOT_URL+'/logout',
                headers : AuthUtils.getAuthHeaders(),
                data:{}
            }
        },
        register : {
            default : {
                method : 'post',
                    url : '/register'
            },
            forgotPassword :  {
            }
        },
        observation : {
            list : {
                method:'get',
                url:'/'
            },
            show : {
            },
            save : {
                method:'post',
                url:'/'
            }
        }
    }
}
