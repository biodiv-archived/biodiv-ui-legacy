import {FETCH_RECOMMENDATIONS} from '../actions/index';
import merge from "lodash/merge";

export default function Recommendations_reducer(state={},action){
  switch (action.type) {
    case FETCH_RECOMMENDATIONS:
    //state.push()-->it manipulate the state
    if(action.payload.data){
      //var concatenated = Object.assign(state,action.payload.data)
      //console.log("conact",state)
      //console.log(concatenated)
      //console.log(state)
      // var a = state;
      // var b = action.payload.data;
      // var c = Object.assign(a,b)
      // state = c ;
      // console.log("testing reducer",c)
      // console.log("testing state",state)
      // console.log(typeof c);
      // console.log(action.payload.data['268519'])
      // console.log(Object.assign(state,action.payload.data))
    //console.log(...state)
      return merge({}, state, action.payload.data);
        //console.log("conact",state)
    }
    //return [action.payload.data, ...state];

  }
  return state;
}
