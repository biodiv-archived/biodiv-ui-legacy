import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery'
import {NavLink,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import UserAvatar from '../util/userIcon'

import './recoName.css'

import { Config } from '../Config';
import RecoComment from './RecoComment.js'
import AuthUtils from '../auth/AuthUtils.js';
import Formsuggest from './Form.js'
import ModalPopup from '../auth/Modal.js';

import {fetchRecommendations} from '../actions'

class RecoName extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      response:this.props.recos['recoVotes'],
      login_modal:false,
      options:'',
      loading:false
    }
    this.authArray=[];
    this.getRecoName=this.getRecoName.bind(this)
    this.getObvAgain=this.getObvAgain.bind(this)
  }

  getRecoName(id){
    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    var obvIds = []
    obvIds.push(id)
    var options = {
      method: 'GET',
      url :     Config.api.API_ROOT_URL+"/observation/recommendationVotes",
      params:{
        obvIds:obvIds.toString()
      },
      json: 'true'
    }
    axios(options)
        .then((response)=>{
          document.body.style.cursor = "default";
          this.setState({
            loading:false
          })
          if(response.status === 200){
            this.setState({
              response:response.data[id]['recoVotes']
            });
          }
        })
  }

  agreePost(recoId,obvId,votes){
    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    var agree1="agreeButton"+obvId+recoId;
    var remove1="removeButton"+obvId+recoId;
    //console.log(obId,recId)
    var options={
      method: 'POST',
      url :   Config.api.ROOT_URL+"/observation/addAgreeRecommendationVote",
      params:{
        obvId:obvId,
        recoId:recoId,
        currentVotes:votes
      },
      headers : AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            //console.log("agree",response)
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
            if(response.status === 200){
              this.getObvAgain(this.props.id)
              this.getRecoName(this.props.id)
            }
            // this.setState({
            //   loading:false
            // })
          })
          .catch((error)=>{
            document.body.style.cursor = "default";
             this.setState({
               loading:false
             })
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

  removePost(recoId,obvId,Votes){
    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    var votes=Votes;
    var agree1="agreeButton"+obvId+recoId;
    var remove1="removeButton"+obvId+recoId;
    //console.log(obId,recId)
    var options={
      method: 'POST',
      url :   Config.api.ROOT_URL+"/observation/removeRecommendationVote",
      params:{
        obvId:obvId,
        recoId:recoId
      },
      headers :AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            //console.log("agree",response)
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
            if(response.status === 200){
              this.getObvAgain(this.props.id)
              this.getRecoName(this.props.id)
            }
          })
          .catch((error)=>{
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
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

  validatePost(recoId,obvId){
    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    var validate1="validateButton"+obvId+recoId;
    var unlock1="unlockButton"+obvId+recoId;
    var options={
      method: 'POST',
        url :   Config.api.ROOT_URL+"/observation/lock/"+obvId,
      params:{
        lockType:"Validate",
        recoId:recoId
      },
      headers :AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            //console.log("validate",response)
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
            if(response.status === 200){
              //this.getRecoName(this.props.id)
              this.getObvAgain(this.props.id)
              this.getRecoName(this.props.id)
            }
          })
          .catch((error)=>{
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
            if(error.response.status === 401){
              this.setState({
              login_modal:!(this.state.login_modal),
              options:options
            })

          }else console.log(error)
          })
  }

  unlockPost(recoId,obvId){
    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    var validate1="validateButton"+obvId+recoId;
    var unlock1="unlockButton"+obvId+recoId;
    var options={
      method: 'POST',
      url :   Config.api.ROOT_URL+"/observation/lock/"+obvId,
      params:{
        lockType:"Unlock",
        recoId:recoId
      },
      headers :AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            //console.log("validate",response)
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
            if(response.status === 200){
              this.getObvAgain(this.props.id)
              this.getRecoName(this.props.id)
            }
          })
          .catch((error)=>{
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
            (error.response.status == 401)?
            (
              this.setState({
              login_modal:!(this.state.login_modal),
              options:options
            })
            ):console.log(error)
          })
  }


  componentDidMount(){

  }

  getObvAgain(obvId){
    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    var options={
      method:"GET",
      url:Config.api.PAMBA_API_ROOT_URL +"/naksha/search/observation/observation/"+obvId,
      headers :AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    axios(options)
        .then((response)=>{
          document.body.style.cursor = "default";
          this.setState({
            loading:false
          })
          this.props.ObvRenderAgain(response);
        })
  }


  render(){
    console.log(this.props.islocked, "recoName called agagin")
    return(
    <div>
      {this.state.login_modal===true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getRecoName} id={this.props.id}/>):null}
    <div>{


      this.state.response.length>0?
      (
        this.state.response.map((item,index)=>{
          var authArray=[]
            return(
          <div key={index} className="well well-sm row " style={{width:'99%',marginLeft:'0.5%',marginTop:'0.2%',marginBottom:'0.1%',paddingRight:'0px',paddingLeft:'0px',backgroundColor:'#FBFCFC'}}>
              <div className="col-sm-6">
                {
                  item.isScientificName===true?
                    (
                      item.hasOwnProperty('speciesId')?
                      (
                          item.speciesId!=null?
                          (
                            <NavLink to={`/${this.props.PublicUrl}species/show/${item.speciesId}`}>
                            <i>{item.hasOwnProperty('normalizedForm') ?<span style={{fontWeight:'bold'}}>{item.normalizedForm}</span>:null}
                            {"    "}  </i>
                          </NavLink>
                          ):
                          (
                                <i>
                                    {item.hasOwnProperty('normalizedForm') ?<span style={{fontWeight:'bold'}}>{item.normalizedForm}</span>:null}
                                    {"    "}
                                </i>
                          )
                      ):
                      (

                              <i>
                                  {item.hasOwnProperty('normalizedForm') ?<span style={{fontWeight:'bold'}}>{item.normalizedForm}</span>:(item.hasOwnProperty('name')?<span style={{fontWeight:'bold'}}>{item.name}</span>:null)}
                                  {"    "}
                              </i>

                      )
                  ):
                  (

                      <i>
                          {item.hasOwnProperty('name') ?<span style={{fontWeight:'bold'}}>{item.name}</span>:null}
                          {"    "}
                      </i>

                  )
                }
                {item.hasOwnProperty('commonNames')?<span style={{color:'black'}}>{item.commonNames}</span>:null}
               </div>
               <div className="col-sm-3" style={{marginLeft:'0%'}}>
                   <div className="row pull-left">
                       {
                         item.authors.map((aut,index)=>{
                           authArray=authArray.concat(aut[0].id)
                           //console.log(authArray)
                           //console.log(localStorage.getItem('id'))
                           //var a=AuthUtils.getLoggedInUser().id;
                           //console.log(item.recoId,$.inArray(parseInt(a),authArray))
                             return(
                               <div key={index} className="col-xs-1">
                                 {
                                      <NavLink to={`/${this.props.PublicUrl}user/show/${aut[0].id}`}>
                                          {
                                            aut[0].icon?
                                            (
                                              <UserAvatar  name={aut[0].name} title={aut[0].name} src={Config.api.ROOT_URL+"/biodiv/users/"+aut[0].icon}  size="30" />
                                            )
                                            :
                                            (
                                              aut[0].profilePic?
                                              (
                                                <UserAvatar  name={aut[0].name} title={aut[0].name} src={aut[0].profilePic}  size="30" />
                                              )
                                              :
                                              (
                                                <UserAvatar  name={aut[0].name} title={aut[0].name}   size="30" />
                                              )
                                            )
                                          }

                                      </NavLink>
                                 }
                               </div>
                             )
                           })
                     }
                   </div>
               </div>
               <div className="col-sm-3 col-xs-12" >
                  <div className="row">
                  <div className="col-xs-4">

                  {
                    item.isLocked===false?
                    (



                          (AuthUtils.isLoggedIn() && (item.hasObvLockPerm || AuthUtils.isAdmin()))?
                            (
                                <button id={"validateBtn"+this.props.id+item.recoId} ref={"validateButton"+this.props.id+item.recoId} className="btn btn-danger btn-xs nameAgree" onClick={this.validatePost.bind(this,item.recoId,this.props.id)} disabled={this.state.loading}>Validate</button>
                            ):
                            null


                    )
                    :
                    (


                          (AuthUtils.isLoggedIn() && (item.hasObvLockPerm || AuthUtils.isAdmin()))?
                            (
                                (item.showLock === false)?
                                (
                                  <button id={"unlockBtn"+this.props.id+item.recoId} ref={"unlockButton"+this.props.id+item.recoId} className="btn btn-danger btn-xs nameAgree" onClick={this.unlockPost.bind(this,item.recoId,this.props.id)} disabled={this.state.loading}>Unlock</button>
                                ):
                                (
                                  <button id={"validateBtn"+this.props.id+item.recoId} ref={"validateButton"+this.props.id+item.recoId} className="btn btn-danger btn-xs nameAgree"  disabled>Validate</button>
                                )

                            ):
                            (
                              (item.showLock === false)?
                              (
                                <span className="glyphicon glyphicon-lock tooltip-content" data-toggle="tooltip" title={"This species id islocked"}></span>

                              ):null
                            )

                    )
                  }

                  </div>
                  <div className="col-xs-4">

                  {
                    (AuthUtils.isLoggedIn())?
                        (
                          ($.inArray(parseInt(AuthUtils.getLoggedInUser().id),authArray))>=0?
                          (

                              item.isLocked===false?
                              (
                                <button id={"removeBtn"+this.props.id+item.recoId} ref={"removeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree" onClick={this.removePost.bind(this,item.recoId,this.props.id,item.authors.length)} disabled={this.state.loading}>Remove</button>
                              ):
                              (
                                (item.showLock===false)?
                                (
                                  <button id={"removeBtn"+this.props.id+item.recoId} ref={"removeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree" disabled>Remove</button>
                                ):
                                (
                                  <button id={"removeBtn"+this.props.id+item.recoId} ref={"removeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree" onClick={this.removePost.bind(this,item.recoId,this.props.id,item.authors.length)}>Remove</button>
                                )

                              )

                          )
                          :
                          (


                              item.isLocked===false?
                              (
                                <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree "  onClick={this.agreePost.bind(this,item.recoId,this.props.id,item.authors.length)} disabled={this.state.loading}>Agree</button>
                              ):
                              (
                                <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree "   disabled>Agree</button>
                              )

                          )
                        )
                        :
                        (


                            item.isLocked===false?
                            (
                              <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree "  onClick={this.agreePost.bind(this,item.recoId,this.props.id,item.authors.length)} disabled={this.state.loading}>Agree</button>
                            ):
                            (
                              <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree "   disabled>Agree</button>
                            )

                        )
                    }

                    </div>
                    <div className="col-xs-4" >

                      <RecoComment key={item.recoId} getReco={this.getRecoName} id1={item.recoId} id2={this.props.id} speciesId={item.hasOwnProperty('speciesId')?(item.speciesId!=null?item.speciesId:"no"):"no"} name={item.name} votes={item.authors.length} commentCount={item.totalCommentCount}/>

                    </div >
                      </div>
                </div>
          </div>
        )}
        )
      )
      :null
    }
      </div>
      <div style={{marginTop:'1%'}}>
          {
            this.props.islocked==="false"?
            (
              <Formsuggest  id2={this.props.id} getReco={this.getRecoName} getObvAgain={this.getObvAgain}/>
            ):
            (
              <center><span style={{color:'green'}}> This observation ID is locked by a  species curator. </span></center>
            )

          }
      </div>
    </div>
    )
  }
}
function mapStateToProps(state){
return {
  Recommendations:state.Recommendations,
  PublicUrl:state.PublicUrl.url
};
}
export default  withRouter(connect(mapStateToProps, {fetchRecommendations})(RecoName));
