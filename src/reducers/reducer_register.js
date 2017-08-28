import {REGISTER} from '../actions/index';

export default function Register_reducer (state=[],action){
  switch (action.type) {
    case REGISTER:
    //state.push()-->it manipulate the state
    //console.log("action",action.payload)

    return state=action.payload.data
    //return [action.payload.data, ...state];
  }
  return state;
}
