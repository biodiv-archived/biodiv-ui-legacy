
import axios from 'axios';

import { Config } from '../Config';

export const FETCH_TAXON_LIST='FETCH_TAXON_LIST';
export function fetchTaxonList(classification,expand_taxon,taxonIds) {
  let url;
  if(expand_taxon){
 url=`${Config.api.API_ROOT_URL}/taxon/list?classification=${classification}&expand_taxon=${expand_taxon}&taxonIds=${taxonIds}`;
  }
  else{
 url=`${Config.api.API_ROOT_URL}/taxon/list?classification=${classification}`;
  }
const request = axios.get(url);
  return {
    type:FETCH_TAXON_LIST,
    payload:request
  }
}
