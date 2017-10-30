import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Select from 'react-select';
import _ from 'lodash';
import queryString from 'query-string';
import Checkbox from 'rc-checkbox';

import 'react-select/dist/react-select.css';
import style from './userGroup.css';
import {ClearObservationPage} from '../actions/index';
import {FetchUserGroupName} from './UserGroupActions';
import UserGroupList from '../util/UserGroup';


class UserGroup extends Component{

constructor(){
  super();
  this.state={
    selectValues:[],
    AllUserGroup:[]
  }
}

  getUrlParameter(){
    const newparams = queryString.parse(document.location.search);
    if(newparams.userGroupList){
      let ids=newparams.userGroupList.split(",").map(item=>  parseInt(item,10));
      UserGroupList.list((values)=> {
      let selectValues=values.model.userGroupInstanceList.filter(item=>{
         return ids.indexOf(item.id) > -1;
      });
      let itemSelected=[];
      selectValues.map(item=>{
        let item1={};
        item1.value=item.name;
        item1.id=item.id;
        item1.webaddress=item.webaddress;
        item1.label=item.name;
        itemSelected.push(item1);
      })
        itemSelected=_.uniqBy(itemSelected,"id");
      this.setState({
        selectValues:itemSelected
      })
      });
    }
  }
  componentDidMount(){
      this.getUrlParameter();
      this.props.FetchUserGroupName();
  }
 logChange(val) {
   let selectValues=this.state.selectValues;
   selectValues.push(val);
   selectValues=_.uniqBy(selectValues,"id");
   this.setState({
     selectValues
   },()=>{
     let arr=[];
     selectValues.map(item=>{
       arr.push(item.id);
     })
    this.props.ClearObservationPage();
    var event = new CustomEvent("userGroup-filter",{ "detail":{
          id:arr
    }
    });
    document.dispatchEvent(event);
   })
}
handleCheckboxes(event){
  let selectValues=this.state.selectValues;
  if(!event.target.checked){
      let selectValue=selectValues.filter((item)=>{
       return item.id !== parseInt(event.target.id)
      })
      this.setState({
        selectValues:selectValue
      },()=>{
        let arr=[];
        this.state.selectValues.map(item=>{
          arr.push(item.id);
        })
       this.props.ClearObservationPage();
       var event = new CustomEvent("userGroup-filter",{ "detail":{
             id:arr
       }
       });
       document.dispatchEvent(event);
      })
  }
event.preventDefault();
}
  render(){
    const data=[];
    this.props.UserGroupNames.map((item)=>{
      let item1={};
      item1.value=item.name;
      item1.id=item.id;
      item1.webaddress=item.webaddress;
      item1.label=item.name;
      data.push(item1)
    })
    return(
      <div>
          {this.state.selectValues.map((item,index)=>{
            return (
              <div key={index}>
                <label>
                    <Checkbox
                        checked
                        id={item.id}
                        value={item.value}
                        onChange={this.handleCheckboxes.bind(this)}
                    />
                     {item.value}
                  </label>
              </div>
          )}
        )}
        <Select
          className="Select-custom"
          name="user group filter"
          value="one"
          options={data}
          onChange={this.logChange.bind(this)}
        />
      </div>

    )
  }
}
function mapStateToProps(state){
return {
  UserGroupNames:state.UserGroupNames,
};
}
export default connect(mapStateToProps, {FetchUserGroupName,ClearObservationPage})(UserGroup);
