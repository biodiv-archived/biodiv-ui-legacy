
import {FETCH_SPECIES_CHART} from '../actions/index';

export default function(state={},action){
  switch (action.type) {
    case FETCH_SPECIES_CHART:
    //state.push()-->it manipulate the state
    return action.payload.data.model.speciesGroupCountList;
    //return [action.payload.data, ...state];
  }

  return state;
}
