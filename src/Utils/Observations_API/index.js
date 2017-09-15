import axios from 'axios';

import {ROOT_URL} from '../../actions';

export {getEditUserGroup,getAllUserGroup};

function getEditUserGroup() {
  const url = `${ROOT_URL}/api/speciesGroup/list?format=json`;
  return axios.get(url).then(response => response.data.model.instanceList);
}
function getAllUserGroup() {
  const url=`${ROOT_URL}/group/list?max=95&format=json`;
  return axios.get(url).then(response => response.data);
}
