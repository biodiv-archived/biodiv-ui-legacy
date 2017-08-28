import axios from 'axios';

const BASE_URL = 'http://indiabiodiversity.org';

export {getEditUserGroup,getAllUserGroup};

function getEditUserGroup() {
  const url = `${BASE_URL}/api/speciesGroup/list?format=json`;
  return axios.get(url).then(response => response.data.model.instanceList);
}
function getAllUserGroup() {
  const url=`${BASE_URL}/group/list?max=95&format=json`;
  return axios.get(url).then(response => response.data);
}
