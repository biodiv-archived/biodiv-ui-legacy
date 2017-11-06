import React, {Component} from 'react';

import loginService from './LoginService';

/**
 * Auth utils class with static methods
 */
class AuthUtils {
    static isLoggedIn() {
      console.log(loginService.getAccessToken());
        if(loginService.getAccessToken()) return true;
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
        if(loginService.getAccessToken()) {
            if(loginService.hasRole(role))  { return true; }
            else { return false; }
        } else return false;
    }

    static getAuthHeaders() {
      return {
        'X-Auth-Token' : loginService.getAccessToken(),
        'X-AppKey'     : "8acc2ea1-2cfc-4be5-8e2d-560b7c4cc288"
      }
    }
}

export default AuthUtils;
