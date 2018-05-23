import {FETCH_DATA_SET_LIST} from '../actions/index';
export default function(state=[],action){
  switch (action.type) {
    case FETCH_DATA_SET_LIST:
    if(action.payload.data)
    return action.payload.data.model.instanceList;
    default:
    return state
  }
  return state;
}
