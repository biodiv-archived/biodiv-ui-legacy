import {FETCH_TAXON_LIST} from '../actions/index';

export default function(state=[],action){
  switch (action.type) {
    case FETCH_TAXON_LIST:
    return action.payload.data
    default:
    return state
  }
  return state;
}
