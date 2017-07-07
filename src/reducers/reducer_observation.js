import {FETCH_OBSERVATION} from '../actions/index';
export default function(state=[],action){
  switch (action.type) {
    case FETCH_OBSERVATION:
    //state.push()-->it manipulate the state
    return state.concat(action.payload.data.model.observationInstanceList);
    //return [action.payload.data, ...state];
  }
  return state;
}
