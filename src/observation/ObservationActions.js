import axios from 'axios';

import { Config } from '../Config';

export const FETCH_OBSERVATION='FETCH_OBSERVATION';

export  function  fetchObservations(parameter) {
const url=`${Config.api.ROOT_URL}/api/observation/list`;
const request = axios.get(url,{params:parameter})

  return {
    type:FETCH_OBSERVATION,
    payload:request
  }
}