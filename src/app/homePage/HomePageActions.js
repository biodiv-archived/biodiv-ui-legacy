import axios from 'axios';

import { Config } from '../../Config';

export const FETCH_HOME_TOTAL_COUNT="FETCH_HOME_TOTAL_COUNT";

export function fetchHomeTotalCount(text) {
    const url=`${Config.api.ROOT_URL}/chart/basicStat`;
  const request = axios.get(url);
  return {
    type:FETCH_HOME_TOTAL_COUNT,
    payload:request
  }
}
