import axios from 'axios';
import history from '../history';
export const AUTH_USER ='AUTH_USER';
export const UNAUTH_USER ='UNAUTH_USER';
export const AUTH_ERROR ='AUTH_ERROR';
export const FETCH_MESSAGE ='FETCH_MESSAGE';
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
export const FETCH_USER_PROFILE='FETCH_USER_PROFILE';

export const ROOT_URL="http://localhost.indiabiodiversity.org";
export  function  fetchObservations(parameter) {
const url=`${ROOT_URL}/api/observation/list`;
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
export function fetchTaxonList(classification,expand_taxon,id) {
  let url;
  if(expand_taxon){
 url=`${ROOT_URL}/taxon/list?classSystem=${classification}&expand_taxon=${expand_taxon}&taxonIds=${id}`;

  }
  else{
 url=`${ROOT_URL}/taxon/list?classSystem=${classification}`;

  }
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


export function signinUser({ email, password }) {
let username=email;
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(
      `${ROOT_URL}/api/login?username=${email}&password=${password}`)
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        localStorage.setItem('token', response.data.model.token);
        localStorage.setItem('id', response.data.model.id);
        dispatch({ type: AUTH_USER, payload:response});

        var Role=[];
        response.data.model.roles.map((item)=>{
          Role=Role.concat(item)
        })
        localStorage.setItem('roles',JSON.stringify(Role))
        // - redirect to the route '/feature'
      }).catch(() => {
        dispatch(authError('Bad sdsg Info'));
      });

  }
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
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

export function fetchTraits(id,sGroup) {
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

  const url=ROOT_URL+"/language/filteredList?format=json"
  const request =axios.get(url);
  return{
    type:FETCH_LANGUAGES,
    payload:request
  }
}
export function fetchUserProfile(id){
  const url=ROOT_URL+"/user/show/"+id;
  const request =axios.get(url);
  return{
    type:FETCH_USER_PROFILE,
    payload:request
  }
}
