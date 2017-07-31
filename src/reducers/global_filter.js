import {GLOBAL_FILTER} from '../actions/index';
export default function(state=[],action){
  switch (action.type) {
    case GLOBAL_FILTER:
    return state.concat(action.payload);
  }

  return state;
}
