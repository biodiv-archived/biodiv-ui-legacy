import React, { Component } from 'react';
import axios from 'axios';
import {FetchUserGroupName} from '../actions/index';
import {connect} from 'react-redux';
import {ClearObservationPage} from '../actions/index';
import {FetchGroupObservations} from '../actions/index';
class GroupNameFilter extends Component{
  constructor(props){
    super(props);
    this.state={
      count:0
    }
  }

  componentDidMount(){
      this.props.FetchUserGroupName(this.state.count);
  }
loadMore(){
  let count=this.state.count;
  count=count+1;
  this.props.FetchUserGroupName(count);
  this.setState({
    count:count
  })
}
fetchGroupObservation(item,userGroup){
  this.props.ClearObservationPage();
  var event = new CustomEvent("group-observation",{ "detail":{
        id:item,
        userGroupName:userGroup
  }
  });
  document.dispatchEvent(event);
}

  render(){

    return(
      <div className="pre-scrollable">
        <ul  className="list list-unstyled">
          {this.props.UserGroupNames.map((item)=>{
            return <a onClick={this.fetchGroupObservation.bind(this,item.id,item.name)}><li key={item.id} >{item.name}</li> </a>
          })}
        </ul>
        <button onClick={this.loadMore.bind(this)} className="btn btn-sm btn-primary">Load More</button>
      </div>

    )
  }
}
function mapStateToProps(state){
return {
  UserGroupNames:state.UserGroupNames,
};
}
export default connect(mapStateToProps, {FetchUserGroupName,ClearObservationPage,FetchGroupObservations})(GroupNameFilter);
