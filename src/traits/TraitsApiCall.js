import axios from "axios";

import { Config } from "../Config";

const isWikwio = Config.api.API_ROOT_URL.indexOf("wiktrop") > 0;

export function getAllTraits(lang) {
  return isWikwio
    ? axios.get(`${Config.api.API_ROOT_URL}/trait/species/list?lan=${lang}`)
    : axios.get(`${Config.api.API_ROOT_URL}/trait/observation/list`);
}
export function getTraitValues(id, lang) {
  return isWikwio
    ? axios.get(`${Config.api.API_ROOT_URL}/trait/traitvalue/${id}?lan=${lang}`)
    : axios.get(`${Config.api.API_ROOT_URL}/trait/traitvalue/${id}`);
}
