import jwt_decode from 'jwt-decode';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import { Config } from '../Config';

/**
* singleton service class to encapsulate login related logic
**/
class LoginService {

    constructor() {
        this.loginStore = new LoginStore();
    }

    setCredentials(response) {
        if(response == undefined) return;

        var decoded = jwt_decode(response.access_token);
        var expires_in = new Date(decoded.exp*1000);
        var rToken_expires_in = new Date(Date.now()+2592000*1000);
        var roles = [];
        decoded['$int_roles'].map((item)=>{
            roles = roles.concat(item)
        })

        this.loginStore.set({'id': parseInt(decoded.id), 'email': decoded.email, 'roles':roles, 'aToken':response.access_token, 'rToken':response.refresh_token, 'expires_in':expires_in,'pic':response.pic,'name':decoded.username, 'rToken_expires_in':rToken_expires_in, 'last_login_date':new Date(decoded.iat*1000)});
    }

    getCredentails() {
        return this.loginStore.get();
    }

    clearCredentials() {
        this.loginStore.clear();
    }

    getAccessToken() {
        var c = this.loginStore.get();
        return c.hasOwnProperty('aToken') ? c.aToken : null;
    }

    getRefreshToken() {
        var c = this.loginStore.get();
        return c.hasOwnProperty('rToken') ? c.rToken : null;
    }

    getLastLoginDate() {
        var c = this.loginStore.get();
        return c.hasOwnProperty('last_login_date') ? new Date(c.last_login_date) : null;
    }

    getCurrentUser() {
        var c = this.loginStore.get();
        if(c.hasOwnProperty('aToken')) {
            return {'id':c.id, 'email':c.email,'pic':c.pic,'name':c.name};
        }
    }

    getCurrentUserRoles() {
        var c = this.loginStore.get();
        // console.log("getCurrentUserRoles",c)
        //var json = (c.roles).to_json;
        return (c.roles);
    }

    hasRole(role) {
      // console.log("hasRole")
      // console.log("inArray",$.inArray(role, this.getCurrentUserRoles()) >= 0)
        return $.inArray(role, this.getCurrentUserRoles()) >= 0;
    }
}

/**
* login store which should not be used outside this file
**/
class LoginStore {
    constructor() {
        //private property to store current credentials
        var _credentials = {};

        this.set = function(props) {
            /*for(var key in props) {
                if(props.hasOwnProperty(key)) {
                    if(typeof props[key] === 'object') {
                        localStorage.setItem('auth_'+key, JSON.stringify(props[key]));
                    } else {
                        localStorage.setItem('auth_'+key, props[key]);
                    }
                }
            }*/
            console.log(props);
            const cookies = new Cookies();
            var domain = Config.api.cookie.domain;
            cookies.set('BAToken', props['aToken'], { path: Config.api.cookie.path , domain: domain, expires:props['expires_in']});//expiry time in 2 days
            cookies.set('BRToken', props['rToken'], { path: Config.api.cookie.path , domain: domain, expires:props['rToken_expires_in']});//max age of 30days in sec
            //cookies.set('id', props['id'], { path: Config.api.cookie.path , domain: domain });//add expires_in etc, m axAge,
            localStorage.setItem('id', props['id']);
            localStorage.setItem('pic', props['pic']);
            localStorage.setItem('name', props['name']);
            localStorage.setItem('last_login_date', props['last_login_date']);
            _credentials = this.get();
        }

        this.get = function() {
            if(_credentials != undefined && _credentials.hasOwnProperty('aToken')) return _credentials;
            else {
                var items = {};
                /*for(var key in localStorage) {
                    if(localStorage.hasOwnProperty(key) && key.startsWith('auth_')) {
                        var auth_key = key.substring(key.indexOf('_') + 1);
                        if(auth_key === 'roles') {
                            items[auth_key] = JSON.parse(localStorage.getItem(key));
                        } else {
                            items[auth_key] = localStorage.getItem(key);
                        }
                    }
                }*/
                const cookies = new Cookies(document.cookie);
                var BAToken = cookies.get("BAToken");
                if(BAToken) {
                    var decoded = jwt_decode(BAToken);
                    var expires_in = new Date(decoded.exp*1000);
                    var roles = [];
                    decoded['$int_roles'].map((item)=>{
                        roles = roles.concat(item)
                    })

                    items['aToken'] = BAToken
                    items['email'] = decoded.email
                    items['expires_in'] = expires_in
                    items['issued_at'] = new Date(decoded.iat*1000);
                    items['id'] = localStorage.getItem('id');
                    items['roles'] = roles;
                    items['pic'] = localStorage.getItem('pic');
                    items['name'] = localStorage.getItem('name');
                }
                //even if batoken is expired these values are needed to getNewAccessToken
                items['rToken'] = cookies.get('BRToken');
                items['last_login_date'] = localStorage.getItem('last_login_date');
                _credentials = items;

                return _credentials;
            }
        }

        this.clear = function() {
          // console.log("loginStore clear function")
/*            for(var key in localStorage) {
                if(localStorage.hasOwnProperty(key) && key.startsWith('auth_')) {
                    localStorage.removeItem(key);
                }
            }

*/
            const cookies = new Cookies();
            var domain = Config.api.cookie.domains;

            var domain = Config.api.cookie.domain;

            cookies.remove("BAToken", { path: Config.api.cookie.path , domain: domain});
            cookies.remove("BRToken", { path: Config.api.cookie.path , domain: domain});
            //cookies.remove("id", { path: Config.api.cookie.path , domain: domain});
            localStorage.removeItem('id');
            localStorage.removeItem('pic');
            localStorage.removeItem('name');
            localStorage.removeItem('last_login_date');
            _credentials = {};
        }
    }
}

//creating singleton instance of service
export default new LoginService();
