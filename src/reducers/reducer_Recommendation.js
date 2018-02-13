import {FETCH_RECOMMENDATIONS} from '../actions/index';

export default function Recommendations_reducer(state=new Object(),action){
  switch (action.type) {
    case FETCH_RECOMMENDATIONS:
    //state.push()-->it manipulate the state
    if(action.payload.data){
      //var concatenated = Object.assign(state,action.payload.data)
      //console.log("conact",state)
      //console.log(concatenated)
      //console.log(state)
      return state=Object.assign(...state,action.payload.data);
        //console.log("conact",state)
    }
    //return [action.payload.data, ...state];

  }
  return state;
}
