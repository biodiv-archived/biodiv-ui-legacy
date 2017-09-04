import { combineReducers } from 'redux';
import SpeciesChartReducer from './reducer_chart_data';
import ObservationReducer from './reducer_observation';
import TaxonReducer from './reducer_taxon_list';
import  UserGroupNames from './reducer_fetch_userGroup';
import  UserGroupObservations from './reducer_fetch_groupobservations';
import  HomeTotalCount from './reducer_home_total_count';
import  EditUserGroupData from './reducer_edit_user_group_data';
import Language_reducer from './reducer_languages.js'



const rootReducer = combineReducers({
  Observation:ObservationReducer,
  ChartData:SpeciesChartReducer,
  treeData:TaxonReducer,
  UserGroupNames:UserGroupNames,
  UserGroupObservations:UserGroupObservations,
  HomeTotalCount:HomeTotalCount,
  EditUserGroupData:EditUserGroupData,
  Languages:Language_reducer,

});

export default rootReducer;
