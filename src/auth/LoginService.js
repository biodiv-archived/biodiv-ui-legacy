import jwt_decode from 'jwt-decode';
import $ from 'jquery';

/**
* singleton service class to encapsulate login related logic
**/
class LoginService {

    constructor() {
        this.loginStore = new LoginStore();
    }

    setCredentials(response) {
        if(response == undefined) return;

        //HACK to use old grails token login
        console.log(response);
        this.loginStore.set({'id': response.model.id, 'email': response.model.username, 'roles': response.model.roles, 'aToken': response.model.token});
/*      var decoded = jwt_decode(response.access_token);
        var expires_in = new Date();
        expires_in.setTime(expires_in.getTime() + decoded.exp);
        var roles = [];
        decoded['$int_roles'].map((item)=>{
            roles = roles.concat(item)
        })

        this.loginStore.set({'id': decoded.id, 'email': decoded.email, 'roles':roles, 'aToken':response.access_token, 'rToken':response.refresh_token, 'expires_in':expires_in});
*/    }

    getCredentails() {
        return this.loginStore.get();
    }

    clearCredentials() {
        this.loginStore.clear();
    }

    getAccessToken() {
        var c = this.loginStore.get();
        return c.hasOwnProperty('aToken') ? c.aToken : '';
    }

    getCurrentUser() {
        var c = this.loginStore.get();
        if(c.hasOwnProperty('aToken')) {
            return {'id':c.id, 'email':c.email};
        }
    }

    getCurrentUserRoles() {
        var c = this.loginStore.get();
        return JSON.parse(c.roles);
    }

    hasRole(role) {
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
            for(var key in props) {
                if(props.hasOwnProperty(key)) {
                    if(typeof props[key] === 'object') {
                        localStorage.setItem('auth_'+key, JSON.stringify(props[key]));
                    } else {
                        localStorage.setItem('auth_'+key, props[key]);
                    }
                }
            }
            _credentials = this.get();
        }

        this.get = function() {
            if(_credentials != undefined && _credentials.hasOwnProperty('aToken')) return _credentials;
            else {
                var items = {};
                for(var key in localStorage) {
                    if(localStorage.hasOwnProperty(key) && key.startsWith('auth_'))
                        var auth_key = key.substring(key.indexOf('_') + 1);
                        if(key === 'roles') {
                            items[auth_key] = JSON.parse(localStorage.getItem(key));
                        } else
                            items[auth_key] = localStorage.getItem(key);
                }
                _credentials = items;
                console.log(_credentials);
                return _credentials;
            }
        }

        this.clear = function() {
            for(var key in localStorage) {
                if(localStorage.hasOwnProperty(key) && key.startsWith('auth_'))
                    localStorage.removeItem(key);
            }
            _credentials = {};
        }
    }
}

//creating singleton instance of service
export default new LoginService();
