import {FETCH_UNIQUE_SPECIES_LOADMORE} from '../actions/index';
import {FETCH_UNIQUE_SPECIES_NEWFILTER} from '../actions/index';

export default function UniqueSpecies_reducer(state={data:[],totalRecoCount:''},action){
  switch (action.type) {
    case FETCH_UNIQUE_SPECIES_NEWFILTER:

    return  {...state,data:action.payload.data.model.distinctRecoList,totalRecoCount:action.payload.data.model.totalRecoCount}
    
    case FETCH_UNIQUE_SPECIES_LOADMORE:
        return {...state,data:state.data.concat(action.payload.data.model.distinctRecoList),totalRecoCount:action.payload.data.model.totalRecoCount}
  }
  return state;
}
