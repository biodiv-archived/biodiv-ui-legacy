import {FETCH_SPECIES_GROUP} from '../actions/index';
export default function(state=[],action){
  switch (action.type) {
    case FETCH_SPECIES_GROUP:
    if(action.payload.data)
    return action.payload.data;
    default:
    return state
  }

  return state;
}
