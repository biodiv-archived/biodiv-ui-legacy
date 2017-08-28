import {FETCH_LANGUAGES} from '../actions/index';

export default function Language_reducer(state=[],action){
  switch (action.type) {
    case FETCH_LANGUAGES:
    //state.push()-->it manipulate the state

    return state=action.payload.data;
    //return [action.payload.data, ...state];

  }
  return state;
}
