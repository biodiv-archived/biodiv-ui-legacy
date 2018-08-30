import {SET_LOCALE} from '../actions/index';

export default function (state="",action){
  //console.log("*******************");
  //console.log(action);
  switch (action.type) {
    case SET_LOCALE:
    return state=action.payload;
  }
  return state;
}
