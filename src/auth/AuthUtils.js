import React, {Component} from 'react';
import $ from 'jquery';

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
        if(!loginService.getAccessToken()) {
            if($.inArray('ROLE_USER', loginService.getRoles()) >= 0) { return true; }
            else { return false; }
        } else return false;       
    }
}

export default AuthUtils;

export function isUser(){
  if(localStorage.getItem('token'))
  {
    if($.inArray('ROLE_USER',JSON.parse(localStorage.getItem('roles')))>=0) {return true}
    else {return false}

  }
  else {return false}
}

export function isAdmin(){
  if(localStorage.getItem('token'))
  {
    if($.inArray('ROLE_ADMIN',JSON.parse(localStorage.getItem('roles')))>=0) {return true}
    else {return false}

  }
  else {return false}
}

export function isUserGroupFounder(){
  if(localStorage.getItem('token'))
  {
    if($.inArray('ROLE_USERGROUP_FOUNDER',JSON.parse(localStorage.getItem('roles')))>=0) {return true}
    else {return false}

  }
  else {return false}
}

export function isUserGroupExpert(){
  if(localStorage.getItem('token'))
  {
    if($.inArray('ROLE_USERGROUP_EXPERT',JSON.parse(localStorage.getItem('roles')))>=0) {return true}
    else {return false}

  }
  else {return false}
}

export function isUserGroupMember(){
  if(localStorage.getItem('token'))
  {
    if($.inArray('ROLE_USERGROUP_MEMBER',JSON.parse(localStorage.getItem('roles')))>=0) {return true}
    else {return false}

  }
  else {return false}
}

export function isSpeciesAdmin(){
  if(localStorage.getItem('token'))
  {
    if($.inArray('ROLE_SPECIES_ADMIN',JSON.parse(localStorage.getItem('roles')))>=0) {return true}
    else {return false}

  }
  else {return false}
}

export function isCepfAdmin(){
  if(localStorage.getItem('token'))
  {
    if($.inArray('ROLE_CEPF_ADMIN',JSON.parse(localStorage.getItem('roles')))>=0) {return true}
    else {return false}

  }
  else {return false}
}
