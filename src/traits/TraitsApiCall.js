import axios from 'axios';

import {Config} from '../Config';

export function getObservationTraits(){

  return axios.get(`${Config.api.API_ROOT_URL}/trait/observation/list`)
}
export function getTraitValues(id){

  return axios.get(`${Config.api.API_ROOT_URL}/trait/traitvalue/${id}`)
}
