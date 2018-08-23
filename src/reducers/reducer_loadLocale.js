import {LOAD_LOCALE} from '../actions/index';

export default function (state={},action){
  console.log("*******************");
  console.log(action);
  switch (action.type) {
    case LOAD_LOCALE:
    return state=action.payload;
  }
  return state;
}
