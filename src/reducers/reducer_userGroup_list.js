import {FETCH_USERGROUP_LIST} from '../actions/index';

export default function UserGroupList_reducer(state=[],action){
  switch (action.type) {
    case FETCH_USERGROUP_LIST:
    //state.push()-->it manipulate the state
    if(action.payload.data){
      return state=action.payload.data.model.userGroupInstanceList;

    }
    //return [action.payload.data, ...state];

  }
  return state;
}
