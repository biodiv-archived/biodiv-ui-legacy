import React, {Component} from 'react';
import axios from 'axios';
import {ROOT_URL} from '../../actions/index.js'
import RecoComment from './recoComment.js'
import './recoName.css'
import {isAdmin,isLoggedIn} from '../auth/roles.js';
import Formsuggest from './form.js'
import $ from 'jquery'
import ModalPopup from '../auth/modal.js';

class RecoName extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      response:'',
      login_modal:false,
      options:''
    }
    this.authArray=[];
    this.getRecoName=this.getRecoName.bind(this)
    this.getRecoName(this.props.id)
  console.log("cookie",localStorage.getItem('token'))
  }

  getRecoName(id){
    axios.get(ROOT_URL+"/api/observation/getRecommendationVotes?id="+ id)
        .then((response)=>{
          this.setState({
            response:response.data.model
          });
        })

  }

  agreePost(recoId,obvId,Votes){
    var obId=obvId;
    var recId=recoId;
    var votes=Votes;
    var agree1="agreeButton"+obId+recId;
    var remove1="removeButton"+obId+recId;
    console.log(obId,recId)
    var options={
      method: 'POST',
      url :   ROOT_URL+"/api/observation/addAgreeRecommendationVote?obvId="+obId+"&recoId="+recId+"&currentVotes="+votes,
      headers :{
        'X-Auth-Token' : localStorage.getItem('token'),
        'X-AppKey'     : "8acc2ea1-2cfc-4be5-8e2d-560b7c4cc288",
        'Accept'        :"text/json"
      },
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            console.log("agree",response)
            this.getRecoName(this.props.id)
          })
          .catch((response)=>{
            (response=="Error: Request failed with status code 401")?
            (
              this.setState({
              login_modal:!(this.state.login_modal),
              options:options
            })

            ):console.log("fofoofof")
          })
  }

  removePost(recoId,obvId,Votes){
    var token=localStorage.getItem('token')
    var obId=obvId;
    var recId=recoId;
    var votes=Votes;
    var agree1="agreeButton"+obId+recId;
    var remove1="removeButton"+obId+recId;
    console.log(obId,recId)
    var options={
      method: 'POST',
      url :   ROOT_URL+"/api/observation/removeRecommendationVote?obvId="+obId+"&recoId="+recId,
      headers :{
        'X-Auth-Token' : token,
        'X-AppKey'     : "8acc2ea1-2cfc-4be5-8e2d-560b7c4cc288",
        'Accept'        :"text/json"
      },
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            console.log("agree",response)
            this.getRecoName(this.props.id)
          })

  }

  validatePost(recoId,obvId){
    var token=localStorage.getItem('token')
    var obId=obvId;
    var recId=recoId;
    var validate1="validateButton"+obId+recId;
    var unlock1="unlockButton"+obId+recId;
    var options={
      method: 'POST',
      url :   ROOT_URL+"/api/observation/"+obId+"/lock?lockType=Validate&recoId="+recId,
      headers :{
        'X-Auth-Token' : token,
        'X-AppKey'     : "8acc2ea1-2cfc-4be5-8e2d-560b7c4cc288",
        'Accept'        :"text/json"
      },
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            console.log("validate",response)
            this.getRecoName(this.props.id)
          })
  }

  unlockPost(recoId,obvId){
    var token=localStorage.getItem('token')
    var obId=obvId;
    var recId=recoId;
    var validate1="validateButton"+obId+recId;
    var unlock1="unlockButton"+obId+recId;
    var options={
      method: 'POST',
      url :   ROOT_URL+"/api/observation/"+obId+"/lock?lockType=Unlock&recoId="+recId,
      headers :{
        'X-Auth-Token' : token,
        'X-AppKey'     : "8acc2ea1-2cfc-4be5-8e2d-560b7c4cc288",
        'Accept'        :"text/json"
      },
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            console.log("validate",response)
            this.getRecoName(this.props.id)
          })
  }


  render(){

    return(
    <div>
      {this.state.login_modal==true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getRecoName} id={this.props.id}/>):null}
      <div>{
      this.state.response.hasOwnProperty('recoVotes')?(
      this.state.response.recoVotes.length>0?
      (

        this.state.response.recoVotes.map((item)=>{
          var authArray=[]
            return(

          <div className="well well-sm row " style={{width:'100%',margin:'0.5%'}}>
              <div className="highlight ellipsis dropdown col-sm-9">

                {
                  item.isScientificName===true?
                    (
                      item.hasOwnProperty('speciesId')?
                      (
                          item.speciesId!=null?
                          (
                              <a href={"http://indiabiodiversity.org/species/show/"+item.speciesId}>
                                <i>
                                    {item.hasOwnProperty('normalizedForm') ? item.normalizedForm:null}
                                    {"    "}
                                </i>
                             </a>
                          ):
                          (
                              <a>
                                <i>
                                    {item.hasOwnProperty('normalizedForm') ? item.normalizedForm:null}
                                    {"    "}
                                </i>
                             </a>
                          )
                      ):
                      (
                            <a>
                              <i>
                                  {item.hasOwnProperty('normalizedForm') ? item.normalizedForm:(item.hasOwnProperty('name')?item.name:null)}
                                  {"    "}
                              </i>
                           </a>
                      )
                  ):
                  (
                    <a >
                      <i>
                          {item.hasOwnProperty('name') ? item.name:null}
                          {"    "}
                      </i>
                   </a>
                  )
                }
                {item.hasOwnProperty('commonNames') ?item.commonNames:null}


                    <a className="dropdown-toggle" data-toggle="dropdown"><span className="badge" style={{backgroudColor:'red'}}>{item.authors.length}</span></a>
                    <ul className="dropdown-menu row " style={{backgroundColor:'#99E0EE'}}>
                        {
                          item.authors.map((aut)=>{
                            authArray=authArray.concat(aut[0].id)
                            console.log(authArray)
                            console.log(localStorage.getItem('id'))
                            var a=localStorage.getItem('id')
                            console.log(item.recoId,$.inArray(parseInt(a),authArray))
                              return(
                                <div className="col-sm-1">
                                <li >
                                <a  href={"http://indiabiodiversity.org/user/show/" + aut[0].id}   title={aut[0].name} >
                                <img className="small-profile-pic img-circle"  src={aut[0].icon} width="30" height="30" />
                                </a>
                                </li>
                                </div>
                              )
                            })
                        }
                    </ul>
               </div>
               <div className="col-sm-1 ">
                  {
                    item.isLocked==false?
                    (
                      <div className="Validate" ref={"validateButton"+this.props.id+item.recoId}>
                        {
                          (isLoggedIn() && (item.hasObvLockPerm || isAdmin()))?
                            (
                                <button id={"validateBtn"+this.props.id+item.recoId} className="btn btn-danger btn-small nameAgree" onClick={this.validatePost.bind(this,item.recoId,this.props.id)}>Validate</button>
                            ):
                            null
                        }
                      </div>
                    )
                    :
                    (
                      <div className="Unlock" ref={"unlockButton"+this.props.id+item.recoId} >
                        {
                          (isLoggedIn() && (item.hasObvLockPerm || isAdmin()))?
                            (
                               <button id={"unlockBtn"+this.props.id+item.recoId} className="btn btn-danger btn-small nameAgree" onClick={this.unlockPost.bind(this,item.recoId,this.props.id)}>Unlock</button>
                            ):
                            null
                        }
                      </div>
                    )
                  }
               </div>
               <div className="col-sm-1">
                  {
                    (isLoggedIn())?
                        (
                          ($.inArray(parseInt(localStorage.getItem('id')),authArray))>=0?
                          (
                            <div className="removeButton" ref={"removeButton"+this.props.id+item.recoId} >
                            {
                              item.isLocked==false?
                              (
                                <button id={"removeBtn"+this.props.id+item.recoId} className="btn btn-primary btn-small nameAgree" onClick={this.removePost.bind(this,item.recoId,this.props.id,item.authors.length)}>Remove</button>
                              ):
                              (
                                <button id={"removeBtn"+this.props.id+item.recoId} className="btn btn-primary btn-small nameAgree" disabled>Remove</button>
                              )
                            }

                            </div>
                          )
                          :
                          (
                            <div className="agreeButton" ref={"agreeButton"+this.props.id+item.recoId}>
                            {
                              item.isLocked==false?
                              (
                                <button id={"agreeBtn"+this.props.id+item.recoId} className="btn btn-primary btn-small nameAgree "  onClick={this.agreePost.bind(this,item.recoId,this.props.id,item.authors.length)} >agree</button>
                              ):
                              (
                                <button id={"agreeBtn"+this.props.id+item.recoId} className="btn btn-primary btn-small nameAgree "   disabled>agree</button>
                              )
                            }
                            </div>
                          )
                        )
                        :
                        (
                          <div className="agreeButton" ref={"agreeButton"+this.props.id+item.recoId}>
                          {
                            item.isLocked==false?
                            (
                              <button id={"agreeBtn"+this.props.id+item.recoId} className="btn btn-primary btn-small nameAgree "  onClick={this.agreePost.bind(this,item.recoId,this.props.id,item.authors.length)} >agree</button>
                            ):
                            (
                              <button id={"agreeBtn"+this.props.id+item.recoId} className="btn btn-primary btn-small nameAgree "   disabled>agree</button>
                            )
                          }
                          </div>
                        )
                    }
               </div>
               <div className="col-sm-1 ">
                        <RecoComment key={item.recoId} getReco={this.getRecoName} id1={item.recoId} id2={this.props.id} speciesId={item.hasOwnProperty('speciesId')?(item.speciesId!=null?item.speciesId:"no"):"no"} name={item.name} votes={item.authors.length}/>
                </div>

          </div>

        )}
        )
      )
      :null
    ):null
    }
      </div>
      <hr style={{height:'2px'}}/>
      <div>
          {
            this.props.isLocked==false?
            (

              <Formsuggest  id2={this.props.id} getReco={this.getRecoName}/>
            ):null

          }
      </div>
    </div>
    )
  }
}

export default RecoName;
