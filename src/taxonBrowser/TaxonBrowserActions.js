
import axios from 'axios';

import { Config } from '../Config';

export const FETCH_TAXON_LIST='FETCH_TAXON_LIST';

export function fetchTaxonList(classification,expand_taxon,id) {
  let url;
  if(expand_taxon){
 url=`${Config.api.ROOT_URL}/taxon/list?classSystem=${classification}&expand_taxon=${expand_taxon}&taxonIds=${id}`;

  }
  else{
 url=`${Config.api.ROOT_URL}/taxon/list?classSystem=${classification}`;

  }
const request = axios.get(url);
  return {
    type:FETCH_TAXON_LIST,
    payload:request
  }
}
