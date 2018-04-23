import axios from 'axios';

import { Config } from '../Config';

export const FETCH_CUSTOM_FIELDS='FETCH_CUSTOM_FIELDS';

export  function  fetchCustomFields(uid) {
  let url=null;
  if(uid){
    url  =`${Config.api.API_ROOT_URL}/observation/customFields/list?uid=${uid}`;
  }
  else{
  url =`${Config.api.API_ROOT_URL}/observation/customFields/list`;
  }
    const request = axios.get(url);

  return {
    type:FETCH_CUSTOM_FIELDS,
    payload:request
  }
}
