// import {FETCH_OBSERVATION} from './ObservationActions';
// import {DELETE_OBSERVATION} from '../actions';
//
// const DEFAULT_STATE={all:[],count:null}
//
// export default function(state=DEFAULT_STATE,action){
//
//   switch (action.type) {
//     case FETCH_OBSERVATION:
//
//
//       if(action.payload.data){
//         return{
//           all:state.all.concat(action.payload.data.model.observationInstanceList),
//           count:action.payload.data.model.instanceTotal,
//           queryParameter:action.payload.data.queryParams
//         }
//       }
//       else {
//         return DEFAULT_STATE;
//
//       }
//
//     case DELETE_OBSERVATION:
//     return DEFAULT_STATE;
//
//     default:
//     return state;
//
//   }
//   return DEFAULT_STATE;
// }
import {FETCH_OBSERVATION} from './ObservationActions';
import {DELETE_OBSERVATION} from '../actions';

const DEFAULT_STATE={all:[],count:null}

export default function(state=DEFAULT_STATE,action){

  switch (action.type) {
    case FETCH_OBSERVATION:
      if(action.payload.data){
        return{
          all:state.all.concat(action.payload.data.documents),
          count:action.payload.data.totalDocuments
        }
      }
      else {
        return DEFAULT_STATE;

      }

    case DELETE_OBSERVATION:
    return DEFAULT_STATE;

    default:
    return state;

  }
  return DEFAULT_STATE;
}
