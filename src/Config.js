import axios from 'axios';

import loginService from './auth/LoginService';
require('dotenv').config()
export const ROOT_URL=process.env.REACT_APP_ROOT_URL
export const API_ROOT_URL=process.env.REACT_APP_API_ROOT_URL
export const PAMBA_API_ROOT_URL=process.env.REACT_APP_PAMBA_API_ROOT_URL
export const IBP_URL=process.env.REACT_APP_IBP_URL
export const BBP_URL=process.env.REACT_APP_BBP_URL
export const WIKTROP_URL=process.env.REACT_APP_WIKTROP_URL
export const DEPLOY=process.env.REACT_APP_CONFIG_DEPLOY;
export const TITLE=process.env.REACT_APP_CONFIG_TITLE;
export const TRACKING_CODE=process.env.REACT_APP_CONFIG_TRACKING_CODE;
export const REACT_APP_MAPBOX_TOKEN=process.env.REACT_APP_MAPBOX_TOKEN;
export const REACT_APP_MAP_CENTER=process.env.REACT_APP_MAP_CENTER;
export const getMapCenterArray = () => {
    const [lat, lng] = process.env.REACT_APP_MAP_CENTER.split(",");
    return [parseInt(lat), parseInt(lng)]
};

axios.defaults.baseURL = ROOT_URL;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


axios.interceptors.request.use(function (config) {

//    console.log('---------------------BEFORE REQUEST START------------------------');
    var accessToken = loginService.accessToken;
    if(accessToken) {
        //  console.log('Adding access token in axios header');
        //  config.headers = { 'X-AUTH-TOKEN' : accessToken};
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }
//    console.log('---------------------BEFORE REQUEST END------------------------');
   config.withCredentials = true;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    //console.log('---------------------ON RESPONSE START------------------------');
    //console.log(response);
    //console.log('---------------------ON RESPONSE END------------------------');
    return response;
}, function(error) {
    console.log(error);
    if(error.status === 401) {
        /*        var credentials = loginService.getCredentials();
        var now = new Date().getTime();
        var brToken = credentials.getRefreshToken();
        var timeLeftForRToken = credentials.getLastLoginDate().getTime() + (30*24*60*60*1000) - now;//issued at+30 days - now

        //if only 5 days are left to get new refresh token we will
        //propmt the user to login again to progress his login window by another 30 days
        if(brToken == null || timeLeftForRToken <= 5) {
        } else {
            //get new accessToken with existing refreshtoken
            getNewAccessToken();
        }*/
        return Promise.reject(error);
    } else {
        return Promise.reject(error);
    }
});


/**
 * Default configuration
 */
export let Config = {
    api:{
        API_ROOT_URL : API_ROOT_URL,
        PAMBA_API_ROOT_URL : PAMBA_API_ROOT_URL,
        ROOT_URL : ROOT_URL,
        IBP_URL:IBP_URL,
        BBP_URL:BBP_URL,
        WIKTROP_URL:WIKTROP_URL,
        DEPLOY:DEPLOY,
        TITLE:TITLE,
        TRACKING_CODE:TRACKING_CODE,
        login : {
            default : {
                method : 'post',
                baseURL:'',
                url :  API_ROOT_URL+'/login/auth',
                headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
                data : {}
            },
            token : {
                method: 'post',
                baseURL:'',
                url : API_ROOT_URL+'/login/token'
            }
        },
        logout : {
            default : {
                method : 'get',
                url :  API_ROOT_URL+'/logout',
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
    },
        map : {
		RESTRICTED_EXTENT : JSON.parse(process.env.REACT_APP_CONFIG_RESTRICTED_EXTENT)
	}
}

Config.api.fbId = process.env.REACT_APP_FB_ID;
Config.api.googleId = process.env.REACT_APP_GOOGLE_ID
Config.api.cookie = {domain : process.env.REACT_APP_COOKIE_DOMAIN, path : '/'};
Config.api.googleRecaptchaKey = process.env.REACT_APP_GOOGLE_RECAPTHA_KEY;
/*
if(process.env.NODE_ENV=="development" ) {
    Config.api.fbId = "115305755799166"
    Config.api.googleId = "317806372709-roromqiujiji1po5jh8adpcr5um895mb.apps.googleusercontent.com"
    Config.api.cookie = {domain : '.indiabiodiversity.org', path : '/'};
} else if(process.env.NODE_ENV=="kk" ){
    Config.api.fbId = "320284831369968"
    Config.api.googleId = "317806372709-tm8qc7j41enrblvqisd11b3mqrjdijfv.apps.googleusercontent.com"
    Config.api.cookie = {domain : '.indiabiodiversity.org', path : '/'};
} else if(process.env.NODE_ENV=="production" ){
  Config.api.fbId = "320284831369968"
   Config.api.googleId = "317806372709-tm8qc7j41enrblvqisd11b3mqrjdijfv.apps.googleusercontent.com"
   Config.api.cookie = {domain : '.indiabiodiversity.org', path : '/'};

    // Config.api.fbId = "2008434629393838"
    // Config.api.googleId = "317806372709-o80ff31oilqdcpujs8264u5ef9m5ejsd.apps.googleusercontent.com"
    // Config.api.cookie = {domain : '.pamba.strandls.com', path : '/'};
}*/