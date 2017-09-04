import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchUserProfile} from '../actions/index';
class ShowUser extends Component{



componentDidMount(){
  const {uid}=this.props.match.params;
  this.props.fetchUserProfile(uid);
}
  render(){
    console.log("this.props.match",this.props.match)
    return(
      <div>
          {this.props.UserProfile.instance?
             this.props.UserProfile.instance.name
             :null}
             <img src={this.props.UserProfile.instance?this.props.UserProfile.instance.icon:null} />
      </div>
    )
  }
}
function mapStateToProps(state) {
    return {
        UserProfile:state.UserProfile
     };
}
export default  withRouter(connect(mapStateToProps,{fetchUserProfile})(ShowUser));
