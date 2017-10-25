
import axios from 'axios';

import { Config } from '../Config';

export const GET_USERGROUPNAME="GET_USERGROUPNAME";

export function FetchUserGroupName() {
    //TODO:max is hardcoded
  const url=`${Config.api.ROOT_URL}/group/list?max=95&format=json`;
  const request = axios.get(url);

  return {
    type:GET_USERGROUPNAME,
    payload:request
  }
}
