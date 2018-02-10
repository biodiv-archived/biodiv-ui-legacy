import * as AuthConstants from './AuthConstants';
import { FETCH_MESSAGE } from '../actions/index'

export default function(state = {}, action) {
  console.log("check",action.type)
  switch(action.type) {

    case AuthConstants.AUTH_USER:
      return { ...state, error: '', authenticated: true};
    case AuthConstants.UNAUTH_USER:
      return { ...state, authenticated: false };
    case AuthConstants.AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
  }

  return state;
}
