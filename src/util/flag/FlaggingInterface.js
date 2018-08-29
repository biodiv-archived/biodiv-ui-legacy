import React, { Component } from 'react';
import axios from 'axios'
import { Config } from '../../Config';
import {NavLink,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import UserAvatar from '../userIcon'
import AuthUtils from '../../auth/AuthUtils.js';
import ModalPopup from '../../auth/Modal.js';
import './Flag.css';

class FlaggingInterface extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      olderFlags:[],
      loading:false,
      login_modal:false,
      options:''
    }
    this.fetchOlderFlags = this.fetchOlderFlags.bind(this);
    this.refreshObvAndFlags = this.refreshObvAndFlags.bind(this);
  }

  componentDidMount(){
    this.fetchOlderFlags()
  }

  fetchOlderFlags(){
    var type =this.props.type;
    var id = this.props.id
    var objectType;
    switch(type){

      case "observation":
        objectType = "species.participation.Observation"
        break;
    }

    var options={
      method:"GET",
      url:Config.api.API_ROOT_URL +"/flag/olderFlags",
      params:{
        objectType:objectType,
        objectId:id
      },
      headers :AuthUtils.getAuthHeaders(),
      json: 'true'
    }

    axios(options)
        .then((response)=>{
          if(response.status===200){
            //document.body.style.cursor = "default";
            //console.log("resposnsedata",response.data)
            this.setState({
              olderFlags:response.data
            })
          }
        })
  }

  removeFlag(flagId){
    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })

    var options={
      method:"POST",
      url:Config.api.ROOT_URL +"/action/deleteFlag",
      params:{
        id:flagId,
      },
      headers :AuthUtils.getAuthHeaders(),
      json: 'true'
    }

    axios(options)
        .then((response)=>{
          if(response.status===200){
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
            this.refreshObvAndFlags()
          }
        })

  }

  flagThisObject(){

    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    var objectId = this.props.id;
    var flagValue;
    var objectType;
    switch(this.props.type){

      case "observation":
        objectType = "species.participation.Observation"
        break;
    }
    let details = "DETAILS_INAPPROPRIATE"+this.props.id;
    let location = "LOCATION_INAPPROPRIATE"+this.props.id;
    let date = "DATE_INAPPROPRIATE"+this.props.id

      if(this.refs[details] && this.refs[details].checked === true){
        flagValue = this.refs[details].value
      }

      if(this.refs[location] && this.refs[location].checked === true){
        flagValue = this.refs[location].value
      }
      if(this.refs[date] && this.refs[date].checked === true){
        flagValue = this.refs[date].value
      }

    let not = "notesFlag"+this.props.id;
    var notes = this.refs[not].value
    this.refs[not].value = '';

    var options={
      method:"POST",
      url:Config.api.ROOT_URL +"/action/flagIt/"+this.props.id,
      params:{
        id:this.props.id,
        type:objectType,
        notes:notes,
        obvFlag:flagValue
      },
      headers :AuthUtils.getAuthHeaders(),
      json: 'true'
    }

    axios(options)
        .then((response)=>{
          if(response.status===200){
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
            this.refreshObvAndFlags()

          }
        })
        .catch((error)=>{
          this.setState({
            loading:false
          })
          document.body.style.cursor = "default";
          if(error.response.status === 401){
            this.setState({
            login_modal:!(this.state.login_modal),
            options:options
          })
        }else{
          console.log(error)
        }
        })
  }

  refreshObvAndFlags(){
    this.fetchOlderFlags(this.props.type,this.props.id)
    this.props.getObsAgain(this.props.id)

  }

  closeFlagDropDown(){
    this.props.closeFlagDropDown(this.props.id)
  }

  render(){
    return(
      <div className="container-fluid">
        {this.state.login_modal===true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.refreshObvAndFlags} id={this.props.id} type="obvFlags"/>):null}
        <div className="row">
            <div className="col-sm-6">
             <b style={{fontSize:'14px',marginLeft:'3%'}}>{this.props.LocaleData['common.observation.why']+"?"}</b>
            </div>
            <div className="col-sm-6">
              <button type="button" className="close pull-right" aria-label="Close" style={{opacity:'1'}} onClick={this.closeFlagDropDown.bind(this)}>
                <b><span aria-hidden="true">&times;</span></b>
              </button>
            </div>
        </div>
        <div>
             <input type="radio" ref={"DETAILS_INAPPROPRIATE"+this.props.id} name="flag" value="DETAILS_INAPPROPRIATE" defaultChecked/>{" "+this.props.LocaleData['default.inappropriateDetails.label']}<br/>
             <input type="radio" ref={"LOCATION_INAPPROPRIATE"+this.props.id} name="flag" value="LOCATION_INAPPROPRIATE"/>{" "+this.props.LocaleData['default.inappropriateLocation.label']}<br/>
             <input type="radio" ref={"DATE_INAPPROPRIATE"+this.props.id} name="flag" value="DATE_INAPPROPRIATE"/>{" "+this.props.LocaleData['default.inappropriateDate.label']}
        </div>
        <br/>
        <div className="row">
            <center><textarea ref={"notesFlag"+this.props.id} placeholder={this.props.LocaleData['default.tellUsWhy.placeholder']} style={{width:'90%',borderRadius:'4px'}}/></center>
        </div>
        <div className="row">
            <button className="btn btn-danger btn-xs pull-right" style={{marginRight:'5%'}} onClick={this.flagThisObject.bind(this)} disabled={this.state.loading}>{this.props.LocaleData['button.flag']}</button>
        </div>
        <br/>
        <div className="row">
            <b style={{fontSize:'14px',marginLeft:'3%'}}>{this.props.LocaleData['default.otherFlags.label']}</b>
        </div>
        <br/>
        <div className="pre-scrollable">
          {
            this.state.olderFlags.map((item,index)=>{
              return(
                <div key={index} className="row well well-sm" style={{marginBottom:'0.1%'}}>
                  <div className="col-sm-2">
                      <NavLink to={`/${this.props.PublicUrl}user/show/${item.user.id}`}>
                      {
                        item.user.icon?
                        (
                          <UserAvatar  name={item.user.name} title={item.user.name} src={"https://pamba.strandls.com"+"/biodiv/users/"+item.user.icon}  size="30" />
                        ):
                        (
                          item.user.profilePic?
                          (
                            <UserAvatar  name={item.user.name} title={item.user.name} src={item.user.profilePic}  size="30" />
                          )
                          :
                          (
                            <UserAvatar  name={item.user.name} title={item.user.name}   size="30" />
                          )
                        )
                      }
                      </NavLink>
                  </div>
                  <div className="col-sm-8">
                      <div className="row" style={{marginLeft:'0.3%'}}>{item.flag+" :"}</div>
                      <div className="row" style={{marginLeft:'0.3%'}}>{item.notes}</div>
                  </div>
                  <div className="col-sm-2">
                      {
                        (AuthUtils.isLoggedIn() && (AuthUtils.isAdmin() || AuthUtils.getLoggedInUser().id === item.user.id.toString()))?
                        (
                          <a className="glyphicon glyphicon-trash" onClick={this.removeFlag.bind(this,item.id)} disabled={this.state.loading}></a>
                        ):null
                      }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
return {
  PublicUrl:state.PublicUrl.url,
  LocaleData:state.LocaleData
};
}
export default  withRouter(connect(mapStateToProps,null)(FlaggingInterface));
