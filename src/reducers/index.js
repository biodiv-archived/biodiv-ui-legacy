import { combineReducers } from 'redux';
import SpeciesChartReducer from './reducer_chart_data';
import ObservationReducer from './reducer_observation';
import TaxonReducer from './reducer_taxon_list';
import  UserGroupNames from './reducer_fetch_userGroup';
import  UserGroupObservations from './reducer_fetch_groupobservations';
import  HomeTotalCount from './reducer_home_total_count';

const rootReducer = combineReducers({
  Observation:ObservationReducer,
  ChartData:SpeciesChartReducer,
  treeData:TaxonReducer,
  UserGroupNames:UserGroupNames,
  UserGroupObservations:UserGroupObservations,
  HomeTotalCount:HomeTotalCount
});

export default rootReducer;
