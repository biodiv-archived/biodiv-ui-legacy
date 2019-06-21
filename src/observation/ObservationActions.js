import axios from "axios";

import { Config } from "../Config";

export const FETCH_OBSERVATION = "FETCH_OBSERVATION";

export function fetchObservations(parameter) {
  const _r = Config.api.API_ROOT_URL;

  const request = axios.get(`${_r}/naksha/search/observation/observation`, {
    params: parameter
  });

  const request1 = axios.get(
    `${_r}/naksha/aggregation/observation/observation`,
    {
      params: parameter
    }
  );

  return {
    type: FETCH_OBSERVATION,
    payload: Promise.all([request, request1])
  };
}
