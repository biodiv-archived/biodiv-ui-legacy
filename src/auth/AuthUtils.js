import React, {Component} from 'react';

import loginService from './LoginService';

/**
 * Auth utils class with static methods
 */
class AuthUtils {
    static isLoggedIn() {
        if(!loginService.getAccessToken()) return true;
        else return false;
    }

    static isUser() {
        return AuthUtils.currentUserHasRole('ROLE_USER');
    }

    static isAdmin(){
        return AuthUtils.currentUserHasRole('ROLE_ADMIN');
    }

    static isUserGroupFounder() {
        return AuthUtils.currentUserHasRole('ROLE_USERGROUP_FOUNDER');
    }

    static currentUserHasRole(role) {
        if(!loginService.getAccessToken()) {
            if(loginService.hasRole(role))  { return true; }
            else { return false; }
        } else return false;       
    }
}

export default AuthUtils;


