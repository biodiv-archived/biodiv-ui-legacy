import {GET_USERGROUPNAME} from './UserGroupActions';
export default function(state=[],action){
  switch (action.type) {
    case GET_USERGROUPNAME:
    if(action.payload.data)
      return action.payload.data.model.userGroupInstanceList
      default:
      return state
  }
  return state;
}
