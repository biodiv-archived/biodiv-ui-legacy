import {FETCH_GROUP_OBSERVATIONS} from '../actions/index';
export default function(state=[],action){
  switch (action.type) {
    case FETCH_GROUP_OBSERVATIONS:
      return action.payload.data.model.observationInstanceList
      default:
      return state
  }
  return state;
}
