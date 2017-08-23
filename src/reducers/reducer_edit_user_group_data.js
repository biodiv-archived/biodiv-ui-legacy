import {FETCH_EDIT_GROUP_DATA} from '../actions/index';
export default function(state={},action){
  switch (action.type) {
    case FETCH_EDIT_GROUP_DATA:
    if(action.payload.data)
    {
    
      return action.payload.data.model.instanceList;
    }

    default:
    return state
  }

  return state;
}
