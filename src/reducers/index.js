import { combineReducers } from 'redux';
import ObservationReducer from './reducer_observation';
const rootReducer = combineReducers({
  Observation:ObservationReducer
});

export default rootReducer;
