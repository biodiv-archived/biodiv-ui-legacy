import { FETCH_OBSERVATION } from "./ObservationActions";
import { DELETE_OBSERVATION } from "../actions";

const DEFAULT_STATE = { all: [], count: null, stats: null };

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_OBSERVATION:
      if (action.payload[0].hasOwnProperty("data")) {
        return {
          all: state.all.concat(action.payload[0].data.documents),
          count: action.payload[0].data.totalDocuments,
          stats: action.payload[1].data
        };
      } else {
        return DEFAULT_STATE;
      }

    case DELETE_OBSERVATION:
      return DEFAULT_STATE;

    default:
      return state;
  }
}
