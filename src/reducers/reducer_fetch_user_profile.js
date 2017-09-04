import {FETCH_USER_PROFILE} from '../actions/index';
export default function(state=[],action){
  switch (action.type) {
    case FETCH_USER_PROFILE:
    if(action.payload.data)
      return action.payload.data
      default:
      return state
  }
  return state;
}
