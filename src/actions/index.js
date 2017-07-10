import axios from 'axios';
//const API_KEY='9189fb8936e52920e38b7fa0aab73cb1';
//const ROOT_URL=`http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
export const FETCH_OBSERVATION='FETCH_OBSERVATION';

export default function  fetchObservations(count) {

const url=`http://indiabiodiversity.org/observation/list?max=2&offset=${count*10}&format=json`;
const request = axios.get(url);
console.log('request:',request);
  return {
    type:FETCH_OBSERVATION,
    payload:request
  }
}
