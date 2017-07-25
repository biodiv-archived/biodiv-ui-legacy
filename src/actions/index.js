import axios from 'axios';
export const FETCH_OBSERVATION='FETCH_OBSERVATION';
export const FETCH_SPECIES_CHART='FETCH_SPECIES_CHART';
export const FETCH_TAXON_LIST='FETCH_TAXON_LIST';
export const DELETE_OBSERVATION='DELETE_OBSERVATION';
export const GLOBAL_FILTER='GLOBAL_FILTER';

const ROOT_URL="http://indiabiodiversity.org/";

export  function  fetchObservations(count,taxon,sGroup) {
  let url;
  if(sGroup){
    console.log(sGroup)
    url=`${ROOT_URL}observation/list?max=2&classification=265799&sGroup=${sGroup}&offset=${count*10}&format=json`;

  }
  else{
    if(taxon==undefined){ url=`${ROOT_URL}observation/list?max=2&offset=${count*10}&format=json`;
    }
    else{
       url=`${ROOT_URL}observation/list?max=2&classification=265799&taxon=${taxon}&offset=${count*10}&format=json`;
    }
  }


const request = axios.get(url);
  return {
    type:FETCH_OBSERVATION,
    payload:request
  }
}

export function fetchSpeciesChart() {
const url=`${ROOT_URL}observation/speciesGroupCount?actionType=list&view=list&sGroup=829&habitat=267835`;
const request = axios.get(url);
  return {
    type:FETCH_SPECIES_CHART,
    payload:request
  }
}
export function fetchTaxonList() {
const url=`${ROOT_URL}taxon/listHierarchy?classSystem=265799`;
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
