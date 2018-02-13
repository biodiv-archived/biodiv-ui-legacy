import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';

import AuthReducer from '../auth/AuthReducer';
import ObservationReducer from '../observation/ObservationReducer';
import TaxonReducer from '../taxonBrowser/TaxonBrowserReducer';
import  UserGroup from '../userGroup/UserGroupReducer';
import  HomeTotalCount from '../app/homePage/HomePageReducer';

import  UserGroupObservations from './reducer_fetch_groupobservations';
import SpeciesChartReducer from './reducer_chart_data';

import Language_reducer from './reducer_languages.js';
import UniqueSpecies_reducer from './reducer_uniqueSpecies.js';
import UserGroupList_reducer from './reducer_userGroup_list.js';
import UserGroupNameForUrl from './reducer_getUserGroupName';

import Recommendation_reducer from './reducer_Recommendation';
import SpeciesGroup from './reducer_speciesGroup';

const rootReducer = combineReducers({
  Observation:ObservationReducer,
  ChartData:SpeciesChartReducer,
  treeData:TaxonReducer,
  UserGroupNames:UserGroup,
  UserGroupObservations:UserGroupObservations,
  HomeTotalCount:HomeTotalCount,
  Languages:Language_reducer,
  auth: AuthReducer,
  form:form,
  UniqueSpeciesList:UniqueSpecies_reducer,
  UserGroupList:UserGroupList_reducer,
  PublicUrl:UserGroupNameForUrl,
  Recommendations:Recommendation_reducer
  SpeciesGroup:SpeciesGroup
});

export default rootReducer;
