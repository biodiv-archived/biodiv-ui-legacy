import { FETCH_FILTER_COUNT } from "../actions/index";
export default function(state = { countUrl: undefined }, action) {
  switch (action.type) {
    case FETCH_FILTER_COUNT:
      if (action.payload) {
        return {
          countUrl: action.payload
        };
      }
      break;
    default:
      return state;
  }
  return state;
}
