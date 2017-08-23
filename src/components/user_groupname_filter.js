import React, { Component } from 'react';
import axios from 'axios';
import {FetchUserGroupName} from '../actions/index';
import {connect} from 'react-redux';
import {ClearObservationPage} from '../actions/index';
import {FetchGroupObservations} from '../actions/index';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class UserGroupNameFilter extends Component{

  componentDidMount(){
      this.props.FetchUserGroupName();
  }

fetchGroupObservation(item,userGroup){
    this.props.ClearObservationPage();
  var event = new CustomEvent("userGroup-filter",{ "detail":{
        id:item,
        userGroupName:userGroup
  }
  });
  document.dispatchEvent(event);
}

 logChange(val) {

  this.props.ClearObservationPage();
  var event = new CustomEvent("userGroup-filter",{ "detail":{
        id:val.id,
        userGroupName:val.value
  }
  });
  document.dispatchEvent(event);
}
  render(){
    const data=[];
    this.props.UserGroupNames.map((item)=>{
      let item1={};
      item1.value=item.name;
      item1.id=item.id;
      item1.webaddress=item.webaddress;
      item1.label=item.name;
      item1.clearValue=false;
      data.push(item1)

    })

    return(
      <div>
        <Select
          name="form-field-name"
          value="one"
          options={data}
          onChange={this.logChange.bind(this)}
        />
        <div className="pre-scrollable">
          <ul  className="list list-unstyled">
            {this.props.UserGroupNames.map((item,index)=>{
              return <a  key={item.name} onClick={this.fetchGroupObservation.bind(this,item.id,item.name)}><li >{index<10?item.name:null}</li> </a>
            })}
          </ul>
        </div>
      </div>

    )
  }
}
function mapStateToProps(state){
return {
  UserGroupNames:state.UserGroupNames,
};
}
export default connect(mapStateToProps, {FetchUserGroupName,ClearObservationPage,FetchGroupObservations})(UserGroupNameFilter);
