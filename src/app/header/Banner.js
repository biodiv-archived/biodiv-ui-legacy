import React,{Component} from 'react';

import {NavLink,withRouter} from 'react-router-dom';
import {getGroupName} from './HeaderApi';
import _ from "lodash";
import {connect} from 'react-redux';
import axios from 'axios';

import {fetchUserGroupList,fetchSpeciesGroup,fetchLanguages} from '../../actions/index';
import AuthUtils from '../../auth/AuthUtils';
import {Config} from '../../Config'
import style from './style/headerstyle.css';
import UserGroupName from '../../util/UserGroup';
import ModalPopup from '../../auth/Modal.js';
import ModeratorPopUp from './ModeratorPopUp';




class Banner extends Component{

    constructor(props){
        super(props);
        this.state={
            PublicUrl:this.props.PublicUrl,
            userUserGroup:[],
            login_modal:false,
            options:{},
            joined:false,
            moderatorPopup:false
        }
        this.getuserUserGroup=this.getuserUserGroup.bind(this);
        this.getJoinPermission=this.getJoinPermission.bind(this)
        this.getPop=this.getPop.bind(this);
    }

    componentDidMount(){
            let userUserGroup=AuthUtils.isLoggedIn()?this.getuserUserGroup():null;
    }

    getuserUserGroup(){
      axios.get(`${Config.api.API_ROOT_URL}/user/currentUserUserGroups`).then((userGroups)=>{
        console.log(userGroups.id);
        this.setState({
          userUserGroup:userGroups.data
        })
      })
    }
    getPop(){
      console.log("log");
      this.setState({
        moderatorPopup:!this.state.moderatorPopup
      })

    }
    getRequestPermission(){
      let url=`${Config.api.ROOT_URL}/${this.props.PublicUrl}userGroup/joinUs`;
      let groupName=this.props.PublicUrl.split("/")[1];



      let options={
          method:'POST',
          url : url,
          headers:AuthUtils.getAuthHeaders(),
          json: 'true'
      }
      axios(options).then((userGroups)=>{
          this.setState({
            joined:true
          })
      })
      .catch((error)=>{
          if(error.response.status === 401){
              this.setState({
                  login_modal:!(this.state.login_modal),
                  options:options
              })
          } else {
              console.log(error.response);
          }
      })
    }

getJoinPermission(){
  let url=`${Config.api.ROOT_URL}/${this.props.PublicUrl}userGroup/joinUs`;
  let options={
      method:'POST',
      url : url,
      headers:AuthUtils.getAuthHeaders(),
      json: 'true'
  }
  axios(options).then((userGroups)=>{
      this.setState({
        joined:true
      })
  })
  .catch((error)=>{
      if(error.response.status === 401){
          this.setState({
              login_modal:!(this.state.login_modal),
              options:options
          })
      } else {
          console.log(error.response);
      }
  })
}


    render(){

        let userGroup=this.props.UserGroupList?this.props.UserGroupList.filter((item)=>{return item.webaddress==this.props.PublicUrl.split("/")[1]})[0]:null;
        //        userGroup = {name:'Assam Biodiversity Portal for invasive species', icon:'/4ad8d75d-7b3b-46bc-bbea-31f6c4ba93be/resources/513.gif'}

        let userUserGroup=this.state.userUserGroup?this.state.userUserGroup.filter((item)=>{return item.webaddress==this.props.PublicUrl.split("/")[1]})[0]:null;
          console.log(userUserGroup);

        if(true) {
            return(
                <div className="navbar navbar-default row brand-bar">
                  {this.state.login_modal===true?(<ModalPopup funcjoinus={this.getJoinPermission} type="joinus" key={this.state.options} options={this.state.options} />):null}
                  {this.state.moderatorPopup?<ModeratorPopUp key={this.state.moderatorPopup} />:null}
                    <div className="navbar-header">
                        <NavLink to="/">
                            <img className="logo pull-left" style={{marginLeft:'15px'}} src={userGroup?"http://indiabiodiversity.org/biodiv/userGroups/"+userGroup.icon:"http://indiabiodiversity.org/logo/IBP.png"}></img>
                        </NavLink>
                        <NavLink to="/" className="navbar-brand" style={{paddingTop:'0.00001px'}}>
                            <h3>{userGroup?userGroup.name:'India Biodiversity Portal'}</h3>
                        </NavLink>
                    </div>
                    <div>
                        {userUserGroup?(
                          <div>
                            {/* <button  className="btn btn-primary pull-right" style={{marginRight:'20px'}}> <span className="glyphicon glyphicon-envelope"></span>Invite Friends</button>
                            <button onClick={this.getPop} className="btn btn-primary pull-right" style={{marginRight:'20px'}}> <span className="glyphicon glyphicon-envelope"></span>Become Moderator</button> */}
                          </div>

                        ):userGroup?userGroup.allowUsersToJoin?
                          (
                            this.state.joined?  (
                              <div>
                              {/* <button  className="btn btn-primary pull-right" style={{marginRight:'20px'}}> <span className="glyphicon glyphicon-envelope"></span>Invite Friends</button>
                              <button onClick={this.getPopup}  className="btn btn-primary pull-right" style={{marginRight:'20px'}}> <span className="glyphicon glyphicon-envelope"></span>Become Moderator</button> */}
                              </div>
                            )
                            :<button onClick={this.getJoinPermission} className="btn btn-xs btn-primary pull-right" style={{marginRight:'20px'}}> <span className="glyphicon glyphicon-plus"></span>Join Us</button>

                          )
                          :(
                            {/*  <button onClick={this.getRequestPermission} className="btn btn-xs btn-danger pull-right" style={{marginRight:'20px'}}> <span className="glyphicon glyphicon-plus"></span>Request Permission</button>*/}
                          ):null
                      }
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        userData: state.auth.userData,
        UserProfile: state.UserProfile,
        UserGroupList:state.UserGroupList,
        PublicUrl:state.PublicUrl.url,
        groupName:state.PublicUrl.groupName
    };
}


export default withRouter(connect(mapStateToProps,{fetchUserGroupList})(Banner));
