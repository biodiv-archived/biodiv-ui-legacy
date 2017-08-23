import {FETCH_HOME_TOTAL_COUNT} from '../actions/index';
export default function(state={},action){
  switch (action.type) {
    case FETCH_HOME_TOTAL_COUNT:
    if(action.payload.data)
    return action.payload.data;
    default:
    return state
  }

  return state;
}
