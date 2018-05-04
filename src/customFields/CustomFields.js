import React from 'react';
import  queryString from 'query-string';
import Collapsible from 'react-collapsible';
import {withRouter,NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import deepEqual from 'deep-equal';

import {fetchCustomFields} from './CustomFieldActions';
import CustomFieldsValues from './CustomFieldValues';
class CustomFields extends React.Component {


   constructor(){
    super();
    this.state={
        CustomFields:[],
        CustomFieldsSelectedMap:new Map(),
        UserGroupList:[]
    }
    this.passToCustomFieldValues=this.passToCustomFieldValues.bind(this);
  }

  callFilter(CustomFieldsSelectedMap){
      var events = new CustomEvent("customFields",{ "detail":{
        customFieldMap:CustomFieldsSelectedMap
      }
      });
       document.dispatchEvent(events);
  }

  passToCustomFieldValues(type,id,values){
    let CustomFieldsSelectedMap=this.state.CustomFieldsSelectedMap;
    let newid=id+"."+type;
  CustomFieldsSelectedMap.set(newid,values);

  this.setState({
  CustomFieldsSelectedMap
  })
  this.callFilter(CustomFieldsSelectedMap)

  }
  setParameter(){
    let groupName=this.props.groupName;
    let newparams = queryString.parse(document.location.search);
    let CustomFieldsSelectedMap=this.state.CustomFieldsSelectedMap;
    Object.keys(newparams).forEach((key)=> {
      if(key.includes("custom")){
        CustomFieldsSelectedMap.set(key.split("_")[1],newparams[key].split(","));
      }
    });
    if(this.props.groupName){
      let group=this.props.UserGroupList.find((item)=>{
          return item.webaddress==groupName
      })
      group?this.props.fetchCustomFields(group.id):null;
    }
    else{
      this.props.fetchCustomFields();

    }
    let fullUrl = window.location.host;
    let parts=fullUrl.split(".");

    if(parts.length>=3){
      let groupid;
      if(parts[0]=="assambiodiversity"){
          groupid=4087136;
      }
      if(parts[0]=="treesindia"){
        groupid=18;
      }
      if(parts[0]=="thewesternghats"){
        groupid=1;
      }
      if(groupid){
        this.props.fetchCustomFields(groupid)

      }
    }
      this.setState({
        CustomFieldsSelectedMap
      })

  }
  componentDidMount(){
    this.setParameter()
  }

setUserGroup(UserGroupList){
  let groupName=this.props.groupName;
  if(groupName){
    let group=UserGroupList.find((item)=>{
        return item.webaddress==groupName
    })
    this.props.fetchCustomFields(group.id);
  }
  else{
    this.props.fetchCustomFields();

  }
  let fullUrl = window.location.host;
  let parts=fullUrl.split(".");
  if(parts.length>=3){
    let groupid;
    if(parts[0]=="assambiodiversity"){

        groupid=4087136;

    }
    if(parts[0]=="treesindia"){
      groupid=18;

    }
    if(parts[0]=="thewesternghats"){
      groupid=1;
    }
    this.props.fetchCustomFields(groupid)
  }
}
  componentWillReceiveProps(nextProps){
      this.setState({
        CustomFields:nextProps.CustomFields,
        UserGroupList:nextProps.UserGroupList
      })
      if(!deepEqual(this.props.UserGroupList,nextProps.UserGroupList)){
        this.setUserGroup(nextProps.UserGroupList)
        this.setParameter()
      }
  }

  render() {

    let customFields=this.state.CustomFields;
    let CustomFieldsSelectedMap=this.state.CustomFieldsSelectedMap;
    let Comkeys = Array.from( CustomFieldsSelectedMap.keys());
    let keys=[];
      Comkeys?Comkeys.map((item)=>{
        keys.push(item.split(".")[0])
      }):null;
    return (
      <div>
        {customFields.length>0?customFields.map((item,index)=>{
          return(
            <div key={index} >
              <Collapsible open={keys.includes(item.id.toString())} trigger={item.name} >
                  <CustomFieldsValues  passToCustomFieldValues={this.passToCustomFieldValues} groupId={item.userGroup.id} customFieldId={item.id} dataType={item.dataType} allowedMultiple={item.allowedMultiple} options={item.options} />
              </Collapsible>
            </div>

          )

        }):"No custom fields for this user group"}



      </div>
    )
  }
}

function mapStateToProps(state){

return {
CustomFields:state.CustomFields,
groupName:state.PublicUrl.groupName,
UserGroupList:state.UserGroupList
};
}
export default  withRouter(connect(mapStateToProps, {fetchCustomFields})(CustomFields));
