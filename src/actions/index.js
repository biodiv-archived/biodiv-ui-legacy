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
export const FETCH_TRAITS_TYPE='FETCH_TRAITS_TYPE';
export const FETCH_RECO_NAME='FETCH_RECO_NAME';
export const FETCH_RECO_COMMENT='FETCH_RECO_COMMENT';
export const FETCH_LANGUAGES='FETCH_LANGUAGES';
export const LOGIN='LOGIN';
export const REGISTER='REGISTER';

export const ROOT_URL="http://indiabiodiversity.org";
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
export  function fetchTraits(id,sGroup) {
const url=ROOT_URL+"/trait/list?objectId="+ id+"&objectType=species.participation.Observation&sGroup="+sGroup+"&isObservationTrait=true&ifOwns=false&showInObservation=true&loadMore=true&displayAny=false&editable=true&fromObservationShow=show&filterable=false&_=1500873700939&format=json";
const request = axios.get(url);

  return {
    type:FETCH_TRAITS_TYPE,
    payload:request

  }
}
export function fetchRecoName(id){
  const url=ROOT_URL+"/api/observation/getRecommendationVotes?id="+ id;
  const request =axios.get(url);

    return{
      type:FETCH_RECO_NAME,
      payload:request
    }
}
export function fetchRecoComment(id){
  const url=ROOT_URL+"/api/comment/getComments?commentHolderId=268292&commentHolderType=species.participation.Observation&rootHolderId=268292&max=3%20&rootHolderType=species.participation.Observation&refTime=1403071938526&%20timeLine=older&format=json";
  const request =axios.get(url);

  return{
    type:FETCH_RECO_COMMENT,
    payload:request
  }
}
export function fetchLanguages(){
  console.log("langauaROOT_URLed")
  const url=ROOT_URL+"/language/filteredList?format=json"
  const request =axios.get(url);
  return{
    type:FETCH_LANGUAGES,
    payload:request
  }
}
export function login(name,pass){
  const url=ROOT_URL+"/api/login?username="+name+"&password="+pass
  const request =axios.post(url);
  return{
    type:LOGIN,
    payload:request
  }
}
export function register(args){
  const url=ROOT_URL+"/api/register/user?email=test1@gmail.com&password=kmvrgbsr&password2=kmvrgbsr&name=asd"
  const request =axios.post(url);
  return{
    type:REGISTER,
    payload:request
  }
}
