import { combineReducers } from 'redux';
import SpeciesChartReducer from './reducer_chart_data';
import ObservationReducer from './reducer_observation';

const rootReducer = combineReducers({
  Observation:ObservationReducer,
  ChartData:SpeciesChartReducer
});

export default rootReducer;
