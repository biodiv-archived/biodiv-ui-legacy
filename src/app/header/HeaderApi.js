import axios from 'axios';

import {Config} from '../../Config';


export function getGroupName(name){

  return axios.get(`${Config.api.API_ROOT_URL}/userGroup/find/${name}`)
}
