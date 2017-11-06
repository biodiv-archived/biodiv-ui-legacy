import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Moment from 'react-moment'
import {bindActionCreators} from 'redux';
import { MentionsInput, Mention } from 'react-mentions'

import commentWithTagStyle from './commentWithTagStyle.js'

import { Config } from '../Config';
import ModalPopup from '../auth/Modal.js';

class RecoComment extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      response:'',
      login_modal:false,
      options:'',
      value:''
    }

    this.getRecoComment=this.getRecoComment.bind(this)
    this.getRecoComment(this.props.id1,this.props.id2)

  }

  getUsers(query, callback){
    var userData
   console.log(query)
   console.log(callback)
   axios.get(Config.api.ROOT_URL+"/user/terms?term="+query+"&format=json")
       .then((response)=>{
         console.log("user response",response)
        let data1= response.data.map((user)=>{
            let data={}
           data.id=JSON.stringify(user.userId)
           data.display=user.value
           return data
         })
          userData=data1
          callback(userData)
       })
 }

 handleChange(e){
    this.setState({
        value: e.target.value
    })
 }

  getRecoComment(id1,id2){
    var d = new Date();
    var tym = d.getTime();
    axios.get(Config.api.ROOT_URL+"/api/comment/getComments?commentHolderId="+id1+"&commentHolderType=species.participation.Observation&rootHolderId="+id2+"&max=3%20&rootHolderType=species.participation.Observation&refTime="+tym+"&%20timeLine=older&format=json")
        .then((response)=>{
          this.setState({
            response:response
          });
        })
  }
  getRecoCommentAgain(id1,id2){
    var d = new Date();
    var tym = d.getTime();
    axios.get(Config.api.ROOT_URL+"/api/comment/getComments?commentHolderId="+id1+"&commentHolderType=species.participation.Observation&rootHolderId="+id2+"&max=30&rootHolderType=species.participation.Observation&refTime="+tym+"&%20timeLine=older&format=json")
        .then((response)=>{
          this.setState({
            response:response
          });
        })
  }

show(id2,id1){
  var comment_table1="comment_table"+id2+id1
  this.refs.hasOwnProperty(comment_table1)?(this.refs[comment_table1].style.display="block"):null
}




recoCommentPost(e){
  e.preventDefault();
  var id1=this.props.id1;
  var id2=this.props.id2;
  var recoComment1="recoComment"+this.props.id2+this.props.id1
  var value1=this.refs[recoComment1].props.value
  var d = new Date();
  var tym = d.getTime();
  var options={
    method:'POST',
    url :   Config.api.ROOT_URL+"/api/comment/addComment?commentHolderId="+id1+"&commentHolderType=species.participation.Observation&rootHolderId="+id2+"&rootHolderType=species.participation.Observation&commentBody="+value1+"&newerTimeRef="+tym,
    headers :{
      'X-Auth-Token' :localStorage.getItem('token'),
      'X-AppKey'     : "8acc2ea1-2cfc-4be5-8e2d-560b7c4cc288",
      'Accept'        :"application/json"
    },
    json: 'true'
  }
  if(value1!=="")
  {
  this.setState({
    value:''
  })
  axios(options)
      .then((response)=>{
        console.log("comment",response)
        this.getRecoComment(this.props.id1,this.props.id2)
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
  }


render(){
      return(
      <span>
      {this.state.login_modal==true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getRecoComment} id={this.props.id2} id1={this.props.id1}/>):null}
      {
        this.state.response.hasOwnProperty('data')?
        (
                <span className="comment-popup dropdown " ref={"popup"}>

                    <a className="btn btn-xs btn-warning dropdown-toggle" data-toggle="dropdown" href="#">
                                <span className="glyphicon glyphicon-comment"></span>
                                {" "}
                    {this.state.response.data.model.hasOwnProperty('instanceList')?(this.state.response.data.model.instanceList.length+this.state.response.data.model.remainingCommentCount):null}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right" style={{width:'500px'}} >
                          <div className="reco-comment-table" ref={"comment_table"+this.props.id2+this.props.id1}>
                              <div className="post-comment">
                                  <form className="form-horizontal post-comment-form" style={{top:'3px'}} onSubmit={this.recoCommentPost.bind(this)}>
                                    <div className="row">
                                      <div className="col-sm-10" >
                                      <MentionsInput
                                          ref={"recoComment"+this.props.id2+this.props.id1}
                                          value={this.state.value}
                                          onChange={this.handleChange.bind(this)}
                                          style={commentWithTagStyle}
                                          placeholder="Write Comment on Species call"
                                       >
                                          <Mention trigger="@"
                                              data={this.getUsers.bind(this)}
                                              style={{backgroundColor: '#90D547'}}
                                            />

                                      </MentionsInput>
                                      </div>
                                      <div className="col-sm-2">
  		                                <input type="submit" value="Post" className="btn comment-post-btn btn-sm" />
                                      </div>
                                    </div>
  	                              </form>
                              </div>
                              <li className="divider row"></li>
                              <div className="previous-comments-container pre-scrollable">
                                   <ul>
                                      {
                                          this.state.response.data.model.hasOwnProperty('instanceList')?(this.state.response.data.model.instanceList.map((item,index)=>{
                                            return(
                                              <li key={index} className="list-unstyled">
                                                  <div className="comment-container well well-sm" style={{width:'90%',marginLeft:'5%'}}>
                                                      <div className="row">
                                                            <div className="author-icon col-md-2">
                                                                  <a href={"http://indiabiodiversity.org/biodiv/user/show/"+ item.author.id}>
                                                                      <img src={item.author.icon} title={item.author.name} width='40px' height='40px'/>
                                                                  </a>
                                                            </div>
                                                            <div className="col-md-10">
                                                                  <b>{item.author.name}</b>
                                                                  <div className="comment-on-species ellipsis">
                                                                        comment on species call:
                                                                          {
                                                                            this.props.speciesId!="no"?
                                                                            (
                                                                              <a href={"http://indiabiodiversity.org/biodiv/species/show/"+this.props.speciesId}>
                                                                                  <i>{" "}{this.props.name}</i>
                                                                              </a>
                                                                            ):
                                                                            (
                                                                              <a >
                                                                                  <i>{" "}{this.props.name}</i>
                                                                              </a>
                                                                            )
                                                                          }
                                                                  </div>
                                                                  <div className="comment body">
                                                                  {
                                                                    <span style={{color:'black'}}>{item.text}</span>
                                                                  }
                                                                  </div>
                                                                  <div className="comment-attributes">
                                                                      <time className="timeago" dateTime={this.state.response.data.model.olderTimeRef}>
                                                                      {
                                                                        <Moment date={item.lastUpdated}/>
                                                                      }
                                                                      </time>
                                                                  </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                              </li>
                                          )
                                          })
                                          ):null
                                        }
                                    </ul>

                                    {
                                      this.state.response.data.model.remainingCommentCount>0?
                                      (
                                        <a className="btn btn-small" onClick={this.getRecoCommentAgain.bind(this,this.props.id1,this.props.id2)}>Show {this.state.response.data.model.remainingCommentCount} more Comments</a>
                                      ):null
                                    }
                              </div>
                              <input type="hidden" name="olderTimeRef" value/>
                          </div>
                    </ul>
                </span>

      ):null
      }
      </span>
    )
  }

}

export default RecoComment;
