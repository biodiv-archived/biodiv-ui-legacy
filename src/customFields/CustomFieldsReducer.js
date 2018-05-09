import {FETCH_CUSTOM_FIELDS} from './CustomFieldActions';

export default function(state=[],action){
  switch (action.type) {
    case FETCH_CUSTOM_FIELDS:
    if(action.payload.data)
    return  action.payload.data
    default:
    return state
  }
  return state;
}
