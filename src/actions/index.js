import axios from 'axios';
export const FETCH_OBSERVATION='FETCH_OBSERVATION';
export const FETCH_SPECIES_CHART='FETCH_SPECIES_CHART';

export  function  fetchObservations(count) {
const url=`http://indiabiodiversity.org/observation/list?max=2&offset=${count*10}&format=json`;
const request = axios.get(url);
  return {
    type:FETCH_OBSERVATION,
    payload:request
  }
}
export function fetchSpeciesChart() {
const url=`http://indiabiodiversity.org/observation/speciesGroupCount?actionType=list&view=list&sGroup=829&habitat=267835`;
const request = axios.get(url);
  return {
    type:FETCH_SPECIES_CHART,
    payload:request
  }
}
