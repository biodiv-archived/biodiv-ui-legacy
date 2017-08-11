import {GET_USERGROUPNAME} from '../actions/index';
export default function(state=[],action){
  switch (action.type) {
    case GET_USERGROUPNAME:
      return state.concat(action.payload.data.model.userGroupInstanceList)
      default:
      return state
  }
  return state;
}
