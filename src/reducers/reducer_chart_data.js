import {FETCH_SPECIES_CHART} from '../actions/index';
export default function(state={},action){
  switch (action.type) {
    case FETCH_SPECIES_CHART:
    if(action.payload.data)
    return action.payload.data.model.speciesGroupCountList;
    default:
    return state
  }

  return state;
}
