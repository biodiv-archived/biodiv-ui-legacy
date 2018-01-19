import {SET_GROUP_NAME} from '../actions/index';
export default function(state={url:null,groupName:null},action){
  switch (action.type) {
    case SET_GROUP_NAME:
    if(action.payload){

      return{
        url:"group/"+action.payload+"/",
        groupName:action.payload
      }
    }
    else{
      return {
        url:"",
        groupName:""
      }
    }
  }
  return state;
}
