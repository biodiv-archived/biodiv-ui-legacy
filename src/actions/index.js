import axios from 'axios';
import { Config } from '../Config';
import AuthUtils from '../auth/AuthUtils.js';

export const FETCH_SPECIES_CHART='FETCH_SPECIES_CHART';
export const FETCH_GROUP_OBSERVATIONS="FETCH_GROUP_OBSERVATIONS";
export const DELETE_OBSERVATION='DELETE_OBSERVATION';

export const FETCH_MESSAGE ='FETCH_MESSAGE';
export const FETCH_LANGUAGES='FETCH_LANGUAGES';
export const FETCH_UNIQUE_SPECIES_LOADMORE='FETCH_UNIQUE_SPECIES_LOADMORE';
export const FETCH_UNIQUE_SPECIES_NEWFILTER='FETCH_UNIQUE_SPECIES_NEWFILTER';
export const FETCH_USERGROUP_LIST='FETCH_USERGROUP_LIST';
export const SET_GROUP_NAME='SET_GROUP_NAME';

export const FETCH_RECOMMENDATIONS='FETCH_RECOMMENDATIONS';
export const DELETE_RECOMMENDATIONS='DELETE_RECOMMENDATIONS';

export const FETCH_SPECIES_GROUP ='FETCH_SPECIES_GROUP';
export const FETCH_FILTER_COUNT ='FETCH_FILTER_COUNT';


export function fetchUniqueSpecies(params,count,flag){
  var options={
    method: 'GET',
    url :   Config.api.ROOT_URL+"/observation/distinctReco",
    params:{
      sort:"lastRevised",
      sGroup:params.sGroup.join(),
      offset:count,
      isFlagged:params.isFlagged,
      classfication:params.classification,
      speciesName:params.speciesName,
      taxon:params.taxon.join(),
      userGroupList:params.userGroupList.join(),
      isMediaFilter:params.isMediaFilter,
      hackRes:true,
    }
  }

const request = axios(options)
  if(flag=="loadMore")
  {
  return {
    type:FETCH_UNIQUE_SPECIES_LOADMORE,
    payload:request,
  }
}
else{
  return {
    type:FETCH_UNIQUE_SPECIES_NEWFILTER,
    payload:request,
  }
}
}


export function fetchSpeciesChart() {
const url=`${Config.api.ROOT_URL}/observation/speciesGroupCount?actionType=list&view=list&sGroup=829&habitat=267835`;
const request = axios.get(url);
  return {
    type:FETCH_SPECIES_CHART,
    payload:request
  }
}

export function FetchGroupObservations(text) {
  const url=`${Config.api.ROOT_URL}/group/${text}/observation/list?sort=lastRevised&view=list`;
  const request = axios.get(url);
  return {
    type:FETCH_GROUP_OBSERVATIONS,
    payload:request
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(Config.api.ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
    }
  }
  export function ClearObservationPage() {
    return {
      type:DELETE_OBSERVATION,
      payload:[]
    }
  }
  export function fetchFilterCount(data) {
    return {
      type:FETCH_FILTER_COUNT,
      payload:data
    }
  }


export function fetchLanguages(){

  const url=Config.api.ROOT_URL+"/language/filteredList?format=json"
  const request =axios.get(url);
  return{
    type:FETCH_LANGUAGES,
    payload:request
  }
}

export function fetchUserGroupList(){
  const url = Config.api.ROOT_URL+"/group/list?max=100&offset=0&format=json"
  const request = axios.get(url);
  return{
    type:FETCH_USERGROUP_LIST,
    payload:request
  }
}
export function fetchSpeciesGroup(){
  const url = Config.api.API_ROOT_URL+"/species/list"
  const request = axios.get(url);
  return{
    type:FETCH_SPECIES_GROUP,
    payload:request
  }
}
export function setGroupName(data){
  return{
    type:SET_GROUP_NAME,
    payload:data
  }
}

export function fetchRecommendations(obvIds){
  var loggedInUserId;
  if(AuthUtils.getLoggedInUser() !== null){
    loggedInUserId = AuthUtils.getLoggedInUser().id;
  }else{
    loggedInUserId = null;
  }
  if(loggedInUserId !==null){
    var url = Config.api.API_ROOT_URL+"/observation/recommendationVotes?obvIds="+obvIds+"&loggedInUserId="+loggedInUserId+"&isAdmin="+AuthUtils.isAdmin()+"&isSpeciesAdmin="+AuthUtils.isSpeciesAdmin();
  }else{
    var url = Config.api.API_ROOT_URL+"/observation/recommendationVotes?obvIds="+obvIds+"&isAdmin="+AuthUtils.isAdmin()+"&isSpeciesAdmin="+AuthUtils.isSpeciesAdmin();
  }

  const request = axios.get(url);
  return{
    type:FETCH_RECOMMENDATIONS,
    payload:request
  }
}

export function clearRecommendations(){
  return{
    type:DELETE_RECOMMENDATIONS,
    payload:{}
  }
}
