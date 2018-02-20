import jwt_decode from 'jwt-decode';
import $ from 'jquery';
import Cookies from 'universal-cookie';
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
        //  this.loginStore.set({'id': response.model.id, 'email': response.model.username, 'roles': response.model.roles, 'aToken': response.model.token});
        var decoded = jwt_decode(response.access_token);
        var expires_in = new Date();
        expires_in.setTime(expires_in.getTime() + decoded.exp);
        var roles = [];
        decoded['$int_roles'].map((item)=>{
            roles = roles.concat(item)
        })

        this.loginStore.set({'id': response.userId, 'email': decoded.email, 'roles':roles, 'aToken':response.access_token, 'rToken':response.refresh_token, 'expires_in':expires_in,'pic':response.pic});
    }

    getCredentails() {
        return this.loginStore.get();
    }

    clearCredentials() {
        this.loginStore.clear();
    }

    getAccessToken() {
      //console.log("getAccessToken")
        var c = this.loginStore.get();
        //console.log("get",c.aToken)

        return c.hasOwnProperty('aToken') ? c.aToken : null;
    }
    getRefreshToken() {
      //console.log("getAccessToken")
        var c = this.loginStore.get();
        //console.log("get",c.aToken)

        return c.hasOwnProperty('rToken') ? c.rToken : null;
    }

    getCurrentUser() {
        var c = this.loginStore.get();
        if(c.hasOwnProperty('aToken')) {
            return {'id':c.id, 'email':c.email,'pic':c.pic};
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
            cookies.set('BAToken', props['aToken'], { path: '/' });//add expires_in etc, m axAge,
            cookies.set('BRToken', props['rToken'], { path: '/' });//add expires_in etc, m axAge,
            cookies.set('id', props['id'], { path: '/' });//add expires_in etc, m axAge,
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
                    var expires_in = new Date();
                    expires_in.setTime(expires_in.getTime() + decoded.exp);
                    var roles = [];
                    decoded['$int_roles'].map((item)=>{
                        roles = roles.concat(item)
                    })

                    items['aToken'] = BAToken
                    items['email'] = decoded.email
                    items['expires_in'] = expires_in
                    items['id'] = cookies.get('id')
                    items['roles'] = roles;
                    items['rToken'] = cookies.get('BRToken');
                }
                _credentials = items;

                return _credentials;
            }
        }

        this.clear = function() {
          // console.log("loginStore clear function")
            const cookies = new Cookies();
            for(var key in localStorage) {
                if(localStorage.hasOwnProperty(key) && key.startsWith('auth_')) {
                    localStorage.removeItem(key);
                }
            }
            cookies.remove("BAToken", { path: '/' });
            cookies.remove("BRToken", { path: '/' });
            cookies.remove("id", { path: '/' });

            _credentials = {};
        }
    }
}

//creating singleton instance of service
export default new LoginService();
