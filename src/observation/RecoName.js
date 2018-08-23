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

import {Carousel} from 'react-bootstrap';

const noOfAuthorsToShow = 3;

function WithInAuthorArray(authorArray,loggedInUserId){
  var result = false;
  var i;
  for(i=0;i<authorArray.length;i++){
    if(authorArray[i][0].id.toString() === loggedInUserId){
      result = true;
      break;
    }
  }
  return result;
}


class RecoName extends React.Component {

  constructor(props) {
    super(props);

    var activeIndex=0;
    if(AuthUtils.isLoggedIn()){
      var i;
        for(i=0;i<this.props.recos['recoVotes'].length;i++){
        var flag = WithInAuthorArray(this.props.recos['recoVotes'][i].authors,AuthUtils.getLoggedInUser().id)
        if(flag){
          activeIndex=i;
          break;
        }
      }
    }

    this.state={
      response:this.props.recos['recoVotes'],
      login_modal:false,
      options:'',
      loading:false,
      activeIndex:activeIndex,
      direction:'null',
    }
    this.authArray=[];
    this.getRecoName=this.getRecoName.bind(this)
    this.getObvAgain=this.getObvAgain.bind(this)
    this.findActiveIndex=this.findActiveIndex.bind(this);
    this.handleSelect=this.handleSelect.bind(this);
  }

  findActiveIndex(recoVotes){
    var activeIndex=0;
    if(AuthUtils.isLoggedIn()){
      var i;
        for(i=0;i<recoVotes.length;i++){
        var flag = WithInAuthorArray(recoVotes[i].authors,AuthUtils.getLoggedInUser().id)
        if(flag){
          activeIndex=i;
          break;
        }
      }
    }
    //console.log("newActiveIndex",activeIndex)
    return activeIndex;
  }

  getRecoName(id){
    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    var obvIds = []
    obvIds.push(id)
    var loggedInUserId;
    if(AuthUtils.getLoggedInUser() !== null){
      loggedInUserId = AuthUtils.getLoggedInUser().id;
    }else{
      loggedInUserId = null;
    }
    if(loggedInUserId !== null){
      var options = {
        method: 'GET',
        url :     Config.api.API_ROOT_URL+"/observation/recommendationVotes",
        params:{
          obvIds:obvIds.toString(),
          loggedInUserId:loggedInUserId,
          isAdmin:AuthUtils.isAdmin(),
          isSpeciesAdmin:AuthUtils.isSpeciesAdmin()
        },
        json: 'true'
      }
    }else{
      var options = {
        method: 'GET',
        url :     Config.api.API_ROOT_URL+"/observation/recommendationVotes",
        params:{
          obvIds:obvIds.toString(),
          isAdmin:AuthUtils.isAdmin(),
          isSpeciesAdmin:AuthUtils.isSpeciesAdmin()
        },
        json: 'true'
      }
    }

    axios(options)
        .then((response)=>{
          document.body.style.cursor = "default";
          this.setState({
            loading:false
          })
          if(response.status === 200){
            this.setState({
              activeIndex:this.findActiveIndex(response.data[id]['recoVotes']),
              response:response.data[id]['recoVotes'],
            });

          }
          // this.setState({
          //     activeIndex:this.findActiveIndex(this.state.response),
          // })
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
      url:Config.api.API_ROOT_URL +"/naksha/search/observation/observation/"+obvId,
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

  showForm(){
    var form1="form"+this.props.id
    var add1="add"+this.props.id
    this.refs[form1]?this.refs[form1].style.display="block":null
    this.refs[add1]?this.refs[add1].style.display="none":null
  }

  handleSelect(selectedIndex, e) {

      this.setState({
        activeIndex: selectedIndex,
        direction: e.direction
      });
    }


  render(){
    //console.log(this.props.islocked, "recoName called agagin")
    return(
    <div>
      {this.state.login_modal===true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getRecoName} id={this.props.id}/>):null}
    <div>{


      this.state.response.length>0?
      (




                  <Carousel
                    activeIndex={this.state.activeIndex}
                    direction={this.state.direction}
                    onSelect={this.handleSelect}
                    slide={false}
                    style={{marginTop:'-1%',zIndex:'20'}}
                  >
                {
                this.state.response.map((item,index)=>{


                  var authArray=[]
                    return(
                  <Carousel.Item style={{zIndex:'20'}}>
                  <div  className="well well-sm row " style={{width:'99%',marginLeft:'0.5%',marginTop:'0.2%',marginBottom:'0.1%',paddingRight:'0px',paddingLeft:'0px',backgroundColor:'#FBFCFC',zIndex:'20'}}>
                      <div className="col-sm-6" style={{height:'40px',overflow:'hidden',paddingLeft:'10px',paddingRight:'10px'}}
                      title={
                        (

                        item.isScientificName===true?
                        (item.hasOwnProperty('speciesId')?(item.speciesId!==null?(item.hasOwnProperty('normalizedForm')?item.normalizedForm:""):(item.hasOwnProperty('normalizedForm')?item.normalizedForm:"")):(item.hasOwnProperty('normalizedForm')?item.normalizedForm:item.hasOwnProperty('name')?(item.name):""))
                        :(item.hasOwnProperty('name')?item.name:"")
                      ) + " "+
                        (
                          item.hasOwnProperty('commonNames')?item.commonNames:""
                        )
                        }
                      >
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
                       <div className="col-sm-2" style={{marginLeft:'0%'}}>
                           <div className="row pull-left">
                               {
                                 item.authors.map((aut,index)=>{
                                   authArray=authArray.concat(aut[0].id)
                                   //console.log(authArray)
                                   //console.log(localStorage.getItem('id'))
                                   //var a=AuthUtils.getLoggedInUser().id;
                                   //console.log(item.recoId,$.inArray(parseInt(a),authArray))
                                     return(
                                       index<noOfAuthorsToShow?
                                       (
                                         <div key={index} className="col-xs-1 facepile" >
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
                                       ):
                                       (
                                         index === noOfAuthorsToShow?(
                                           <div key={index} className="col-xs-1 dropdown container facepile" >
                                              <a className="dropdown-toggle" data-toggle="dropdown">
                                              <UserAvatar  name={"+"+(item.authors.length-noOfAuthorsToShow).toString()} title={"See All"} color="yellow"   size="30" />
                                              </a>
                                              <div className="dropdown-menu row " style={{backgroundColor:'#bcdae2',borderRadius:'4px',minWidth:'200px'}}>
                                                {
                                                  item.authors.map((aut,index)=>{
                                                    return(
                                                      <div key={index} className="col-xs-1" >
                                                        {
                                                             <NavLink to={`/${this.props.PublicUrl}user/show/${aut[0].id}`} >
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
                                         ):
                                         null
                                       )

                                     )
                                   })
                             }
                           </div>
                       </div>
                       <div className="col-sm-4" >
                          <div className="row pull-right" >
                          <div style={{marginRight:'10px'}}>

                          {
                            item.isLocked===false?
                            (



                                  (AuthUtils.isLoggedIn() && (item.hasObvLockPerm || AuthUtils.isAdmin()))?
                                    (
                                        <button id={"validateBtn"+this.props.id+item.recoId} ref={"validateButton"+this.props.id+item.recoId} className="btn btn-danger btn-xs nameAgree bigxs" onClick={this.validatePost.bind(this,item.recoId,this.props.id)} disabled={this.state.loading}>Validate</button>
                                    ):
                                    null


                            )
                            :
                            (


                                  (AuthUtils.isLoggedIn() && (item.hasObvLockPerm || AuthUtils.isAdmin()))?
                                    (
                                        (item.showLock === false)?
                                        (
                                          <button id={"unlockBtn"+this.props.id+item.recoId} ref={"unlockButton"+this.props.id+item.recoId} className="btn btn-danger btn-xs nameAgree bigxs" onClick={this.unlockPost.bind(this,item.recoId,this.props.id)} disabled={this.state.loading}>Unlock</button>
                                        ):
                                        (
                                          <button id={"validateBtn"+this.props.id+item.recoId} ref={"validateButton"+this.props.id+item.recoId} className="btn btn-danger btn-xs nameAgree bigxs"  disabled>Validate</button>
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




                          {
                            (AuthUtils.isLoggedIn())?
                                (
                                  ($.inArray(parseInt(AuthUtils.getLoggedInUser().id),authArray))>=0?
                                  (

                                      item.isLocked===false?
                                      (
                                        <button id={"removeBtn"+this.props.id+item.recoId} ref={"removeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree bigxs" onClick={this.removePost.bind(this,item.recoId,this.props.id,item.authors.length)} disabled={this.state.loading}>Remove</button>
                                      ):
                                      (
                                        (item.showLock===false)?
                                        (
                                          <button id={"removeBtn"+this.props.id+item.recoId} ref={"removeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree bigxs" disabled>Remove</button>
                                        ):
                                        (
                                          <button id={"removeBtn"+this.props.id+item.recoId} ref={"removeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree bigxs" onClick={this.removePost.bind(this,item.recoId,this.props.id,item.authors.length)}>Remove</button>
                                        )

                                      )

                                  )
                                  :
                                  (


                                      item.isLocked===false?
                                      (
                                        <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree bigxs"  onClick={this.agreePost.bind(this,item.recoId,this.props.id,item.authors.length)} disabled={this.state.loading}>Agree</button>
                                      ):
                                      (
                                        <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree bigxs"   disabled>Agree</button>
                                      )

                                  )
                                )
                                :
                                (


                                    item.isLocked===false?
                                    (
                                      <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree bigxs"  onClick={this.agreePost.bind(this,item.recoId,this.props.id,item.authors.length)} disabled={this.state.loading}>Agree</button>
                                    ):
                                    (
                                      <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree bigxs"   disabled>Agree</button>
                                    )

                                )
                            }




                              <RecoComment key={item.recoId} getReco={this.getRecoName} id1={item.recoId} id2={this.props.id} speciesId={item.hasOwnProperty('speciesId')?(item.speciesId!=null?item.speciesId:"no"):"no"} name={item.name} votes={item.authors.length} commentCount={item.totalCommentCount} style={{zIndex:'20'}}/>

                              </div>
                              </div>
                        </div>
                  </div>

                  </Carousel.Item>
                )
              }
                )
              }
              </Carousel>



      )
      :null
    }
      </div>
      <div style={{marginTop:'1.9vh'}}>
          {
            this.props.islocked==="false"?
            (
              <div>
              {
                this.state.response.length>0?
                (
                  <div>
                  <center style={{display:'block'}} ref={"add"+this.props.id}>  <button  className="btn btn-primary" style={{borderRadius:'1em'}}><span className="glyphicon glyphicon-plus"    onClick={this.showForm.bind(this)}><span style={{fontFamily:'none'}}>Suggest</span></span></button></center>
                  <div style={{display:'none'}} ref={"form"+this.props.id}>
                  <Formsuggest   id2={this.props.id} getReco={this.getRecoName} getObvAgain={this.getObvAgain} />
                  </div>
                  </div>
                )
                :
                (
                  <div>
                  <center style={{display:'none'}} ref={"add"+this.props.id}>  <button  className="btn btn-primary" style={{borderRadius:'1em'}}><span className="glyphicon glyphicon-plus"    onClick={this.showForm.bind(this)}><span style={{fontFamily:'none'}}>Suggest</span></span></button></center>
                  <div style={{display:'block'}} ref={"form"+this.props.id}>
                  <Formsuggest   id2={this.props.id} getReco={this.getRecoName} getObvAgain={this.getObvAgain} />
                  </div>
                  </div>
                )
              }


              </div>
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
