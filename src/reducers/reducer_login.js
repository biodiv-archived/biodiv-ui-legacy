import {LOGIN} from '../actions/index';

export default function Login_reducer (state=[],action){
  switch (action.type) {
    case LOGIN:
    //state.push()-->it manipulate the state
    //console.log("action",action.payload)
    console.log(action.payload.request.status)

      return state=action.payload.data.model.token


    //return [action.payload.data, ...state];
  }
  return state;
}
