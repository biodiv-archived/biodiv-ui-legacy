import {FETCH_OBSERVATION} from '../actions/index';
import {DELETE_OBSERVATION} from '../actions/index';

export default function(state=[],action){
  switch (action.type) {
    case FETCH_OBSERVATION:
     return state.concat(action.payload.data.model.observationInstanceList);
    case DELETE_OBSERVATION:
    return state=[];

  }
  return state;
}
