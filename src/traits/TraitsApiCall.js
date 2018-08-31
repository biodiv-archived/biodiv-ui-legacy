import axios from 'axios';

import {Config} from '../Config';

export function getAllTraits(lang){

  return axios.get(`${Config.api.API_ROOT_URL}/trait/species/list?lan=${lang}`)
}
export function getTraitValues(id,lang){

  return axios.get(`${Config.api.API_ROOT_URL}/trait/traitvalue/${id}?lan=${lang}`)
}
