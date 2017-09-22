import axios from 'axios';

import LoginService from './auth/LoginService';

export let ROOT_URL;
export let API_ROOT_URL;

if(process.env.REACT_APP_ENV=="dev" ){
  ROOT_URL="https://pamba.strandls.com/";
  API_ROOT_URL="http://api.local.ibp.org/";
}
if(process.env.REACT_APP_ENV=="kk" ){
  ROOT_URL="http://indiabiodiversity.org/";
  API_ROOT_URL="https://pamba.strandls.com/";
}

/**
 * AXIOS default settings
 */
axios.defaults.baseURL = API_ROOT_URL;
//axios.defaults.headers.common['Authorization'] = 'X-AUTH-TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//interceptor to include accessToken into all api requests
axios.interceptors.request.use(function (config) {
    // Add authorization headers before request is sent
    console.log('---------------------BEFORE REQUEST START------------------------');
    console.log(config.headers);
    var accessToken = LoginService.accessToken;
    if(accessToken) {
        console.log('Adding access token in axios header');
        config.headers = { 'X-AUTH-TOKEN' : accessToken};
    }
    console.log('---------------------BEFORE REQUEST END------------------------');
    return config;
}, function (error) {
    return Promise.reject(error);
});

//interceptor to include accessToken into all api requests
axios.interceptors.response.use(function (response) {
    // Add authorization headers before request is sent
    console.log('---------------------ON RESPONSE START------------------------');
    console.log(response);
    console.log('---------------------ON RESPONSE END------------------------');
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
        ROOT_URL : ROOT_URL,
        login : {
            default : {
                method : 'post',
                url : '/login',
                headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
                data : {}
            },
            token : {
                method: 'post',
                url : '/token'
            }
        },
        logout : {
            default : {
                method : 'get',
                url : '/logout',
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
            },
            show : {
            }
        }
    }
}
