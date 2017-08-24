import axios from 'axios';
export const FETCH_OBSERVATION='FETCH_OBSERVATION';
export const FETCH_SPECIES_CHART='FETCH_SPECIES_CHART';
export const FETCH_TAXON_LIST='FETCH_TAXON_LIST';
export const DELETE_OBSERVATION='DELETE_OBSERVATION';
export const GLOBAL_FILTER='GLOBAL_FILTER';
export const GET_OBSERVATION_COUNT="GET_OBSERVATION_COUNT";
export const GET_USERGROUPNAME="GET_USERGROUPNAME";
export const FETCH_GROUP_OBSERVATIONS="FETCH_GROUP_OBSERVATIONS";
export const FETCH_HOME_TOTAL_COUNT="FETCH_HOME_TOTAL_COUNT";
export const FETCH_COMMENT_DATA="FETCH_COMMENT_DATA";
export const FETCH_EDIT_GROUP_DATA="FETCH_EDIT_GROUP_DATA";

const ROOT_URL="http://indiabiodiversity.org";
export  function  fetchObservations(parameter) {
const url=`${ROOT_URL}/observation/list`;
const request = axios.get(url,{params:parameter})
  return {
    type:FETCH_OBSERVATION,
    payload:request
  }
}

export function fetchSpeciesChart() {
const url=`${ROOT_URL}/observation/speciesGroupCount?actionType=list&view=list&sGroup=829&habitat=267835`;
const request = axios.get(url);
  return {
    type:FETCH_SPECIES_CHART,
    payload:request
  }
}
export function fetchTaxonList(classification) {
const url=`${ROOT_URL}/taxon/listHierarchy?classSystem=${classification}`;
const request = axios.get(url);
  return {
    type:FETCH_TAXON_LIST,
    payload:request
  }
}
export function ClearObservationPage() {
  return {
    type:DELETE_OBSERVATION,
    payload:[]
  }
}
export function FetchUserGroupName() {
  const url=`${ROOT_URL}/group/list?max=95&format=json`;
  const request = axios.get(url);

  return {
    type:GET_USERGROUPNAME,
    payload:request
  }
}
export function FetchGroupObservations(text) {
  const url=`${ROOT_URL}/group/${text}/observation/list?sort=lastRevised&view=list`;
  const request = axios.get(url);
  return {
    type:FETCH_GROUP_OBSERVATIONS,
    payload:request
  }
}
export function fetchHomeTotalCount(text) {
    const url=`${ROOT_URL}/chart/basicStat`;
  const request = axios.get(url);
  return {
    type:FETCH_HOME_TOTAL_COUNT,
    payload:request
  }
}
export function fetchEditUserGroupData() {
  const url=`${ROOT_URL}/api/speciesGroup/list?format=json`;
  const request = axios.get(url);
  return {
    type:FETCH_EDIT_GROUP_DATA,
    payload:request
  }
}
