import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Moment from 'react-moment'
import {bindActionCreators} from 'redux';
import { MentionsInput, Mention } from 'react-mentions'
import {withRouter} from 'react-router-dom';


import commentWithTagStyle from './commentWithTagStyle.js'

import { Config } from '../Config';
import ModalPopup from '../auth/Modal.js';
import AuthUtils from '../auth/AuthUtils.js';
import RichTextEditor from '../util/richEditor/RichTextEditor.js'
import $ from 'jquery'
import './recoComment.css'

class RecoComment extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      response:[],
      login_modal:false,
      options:'',
      value:'',
      commentCount:this.props.commentCount,
      remainingCommentCount:null,
      loading:false
    }
    //console.log("count of recoComent",this.props.commentCount)
    this.semiComments=[]
    this.fetchCount=0;
    this.refTym='';
    this.getRecoComment=this.getRecoComment.bind(this)
    this.incrementCount = this.incrementCount.bind(this)
    //this.getRecoComment(this.props.id1,this.props.id2)

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

  getRecoComment(first,second){
    document.body.style.cursor = "wait";
    var pop = "popup"+this.props.id1
    if(first === true || second === true){
      this.refs[pop].className = "drop-content container"
    }
    if(!this.refs[pop].classList.contains("show")){
      this.refs[pop].classList.add("show");

      var refTime;
      var id1 = this.props.id1
      var id2 = this.props.id2
      if(first === true)
      {
        this.setState({
          response:[],
        });
        //console.log("inside fistr ttrue")
        //console.log(this.fetchCount,this.state.response)
        this.fetchCount=0;
      }
      if(this.fetchCount>0){
        refTime = this.refTym
        console.log("using older time")
      }else{
        var d = new Date();
        var tym = d.getTime();
        refTime = tym;
        console.log("using current time")
      }
      var options = {
        method: 'GET',
        url :     Config.api.ROOT_URL+"/comment/getComments",
        params:{
          commentHolderId:id1,
          commentHolderType:"species.participation.Recommendation",
          rootHolderId:id2,
          rootHolderType:"species.participation.Observation",
          refTime:refTime,
          timeLine:"older",
          commentType:"context",
          max:3
        },
        json: 'true'
      }
      axios(options)
          .then((response)=>{
            document.body.style.cursor = "default";
            if(response.status === 200){
              if(response.data){
                console.log("setting data")
              this.semiComments=response.data.model.instanceList.reverse();
              this.semiComments=this.semiComments.concat(this.state.response)
              console.log("semifeeeeds",this.semiComments)
              this.setState({
                response:this.semiComments,
                remainingCommentCount:response.data.model.remainingCommentCount
              })
              this.refTym = response.data.model.olderTimeRef
              this.fetchCount++
            }
          }
        })
    }else{
      document.body.style.cursor = "default";
       if(this.refs[pop].classList.contains("show")){
         this.refs[pop].classList.remove("show")
       }
    }
      }

  getRecoCommentAgain(id1,id2){
    var d = new Date();
    var tym = d.getTime();
    axios.get(Config.api.ROOT_URL+"/comment/getComments?commentHolderId="+id1+"&commentHolderType=species.participation.Recommendation&rootHolderId="+id2+"&max=30&rootHolderType=species.participation.Observation&refTime="+tym+"&%20timeLine=older&commentType=context&format=json")
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

incrementCount(){
  this.setState({
    commentCount: (this.state.commentCount)+1
  })
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
    url :   Config.api.ROOT_URL+"/comment/addComment",
    params:{
      commentHolderId:id1,
      commentHolderType:"species.participation.Recommendation",
      rootHolderId:id2,
      rootHolderType:"species.participation.Observation",
      commentBody:value1,
      newerTimeRef:tym
    },
    headers : AuthUtils.getAuthHeaders(),
    json: 'true'
  }
  if(value1!=="")
  {
  this.setState({
    value:''
  })
  axios(options)
      .then((response)=>{
        //console.log("comment",response)
        if(response.status === 200){
          this.getRecoComment()
//console.log("commentCounbt",this.state.commentCount)
        }

      })
      .catch((error)=>{
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
  }

  editOnComment(id,id2){
    var del = "Delete"+id+id2;
    var rep = "Reply"+id+id2;
    var edit = "Edit"+id+id2;
    var box = "Replybox"+id+id2;
    var box2 = "Editbox"+id+id2;
    var canEdit ="CancelEdit"+id+id2;
    this.refs.hasOwnProperty(edit)?(this.refs[edit].style.display="none"):null
    this.refs.hasOwnProperty(rep)?(this.refs[rep].style.display="none"):null
    this.refs.hasOwnProperty(del)?(this.refs[del].style.display="none"):null
    this.refs.hasOwnProperty(canEdit)?(this.refs[canEdit].style.display="block"):null
    this.refs.hasOwnProperty(box2)?(this.refs[box2].style.display="block"):null
    this.refs.hasOwnProperty(box)?(this.refs[box].style.display="none"):null
  }

  deleteOnComment(id){
    //console.log("deleteonCommmmmmmmmmmment",id)
    document.body.style.cursor = "wait";
    var options={
       method:'POST',
       url :   Config.api.API_ROOT_URL+"/comment/removeComment?commentId="+id,
       headers : AuthUtils.getAuthHeaders(),
       json: 'true'
     }
     axios(options)
         .then((response)=>{
           //console.log("comment",response)
           //console.log(this.props.fetchFeeds)
           document.body.style.cursor = "default";
           if(response.status === 200){
             this.setState({
               commentCount:(this.state.commentCount)- 1
             })
             this.getRecoComment(true);
           }

         })
          .catch((error)=>{
            document.body.style.cursor = "default";
            if(error.response.status == 401){
              this.setState({
              login_modal:!(this.state.login_modal),
              options:options
            })
          }else{
            console.log(error.response.statusText)
          }
          })
  }

  cancelEditOnComment(item,id2){
    var rep = "Reply"+item.id+id2;
    var box = "Replybox"+item.id+id2;
    var box2 = "Editbox"+item.id+id2;
    var canEdit ="CancelEdit"+item.id+id2;
    var edit = "Edit"+item.id+id2;
    var del = "Delete"+item.id+id2;
    this.refs.hasOwnProperty(canEdit)?(this.refs[canEdit].style.display="none"):null
    this.refs.hasOwnProperty(rep)?(this.refs[rep].style.display="block"):null

    if(AuthUtils.isLoggedIn() && item.author.id==AuthUtils.getLoggedInUser().id){
      this.refs.hasOwnProperty(edit)?(this.refs[edit].style.display="block"):null
      this.refs.hasOwnProperty(del)?(this.refs[del].style.display="block"):null
    }
    this.refs.hasOwnProperty(box2)?(this.refs[box2].style.display="none"):null
    this.refs.hasOwnProperty(box)?(this.refs[box].style.display="none"):null
  }


render(){
      return(
      <span>
      {this.state.login_modal==true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getRecoComment} id={this.props.id2} id1={this.props.id1}/>):null}
      {
          <div className="comment-popup drop ">

                    <a className="btn btn-xs  bigmarginxs"  onClick={this.getRecoComment}>
                                <span className="glyphicon glyphicon-comment" style={{color:'#000'}}></span>
                                {" "}
                    {this.state.commentCount}
                    </a>
                    <div className="drop-content container" ref={"popup"+this.props.id1} >
                          <div className="reco-comment-table" ref={"comment_table"+this.props.id2+this.props.id1}>
                              <div className="post-comment row">
                                      <div style={{marginLeft:'2%',marginTop:'1%'}}>
                                        <RichTextEditor ref={"recoComment"+this.props.id1+this.props.id2} key={"richtextComment"+this.props.id1+this.props.id2}
                                                    //htm={'Thanks <a class="red tagUsers" contenteditable="false" href="http://indiabiodiversity.org/user/show/2920" rel="2920" target="_blank">Muthu Karthick</a> for the ID http://localhost:3000/observation/list?count=0&hasMore=true&max=10&offset=0&sort=lastRevised'}
                                                    obvId={this.props.id2}
                                                    chId={this.props.id1}
                                                    getRecoComment={this.getRecoComment}
                                                    incrementCount={this.incrementCount}
                                                    PublicUrl={this.props.PublicUrl}
                                        />
                                        </div>
                              </div>

                              <div className="previous-comments-container pre-scrollable" style={{marginTop:'0.7%'}}>
                                   <ul className="list-unstyled">
                                      {
                                          this.state.response && this.state.response.length>0?(this.state.response.map((item,index)=>{
                                            return(
                                              <li key={index} className="list-unstyled">
                                                  <div className="comment-container well well-sm" style={{marginBottom:'0.2%'}}>
                                                      <div className="row">
                                                            <div className="author-icon col-sm-2">
                                                                  <a href={this.props.PublicUrl+"/user/show/"+ item.author.id}>
                                                                      <img src={item.author.icon} title={item.author.name} width='40px' height='40px'/>
                                                                  </a>
                                                            </div>
                                                            <div className="col-sm-10">
                                                                  <b>{item.author.name}</b>
                                                                  <div className="comment-on-species ellipsis">
                                                                        comment on species call:
                                                                          {
                                                                            this.props.speciesId!="no"?
                                                                            (
                                                                              <a href={"/species/show/"+this.props.speciesId}>
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
                                                                    <span className="parse" style={{color:'black',wordWrap:'break-word'}} dangerouslySetInnerHTML={{ __html: item.text }} />
                                                                  }
                                                                  </div>
                                                                  <div className="comment-attributes">
                                                                  {
                                                                    ((new Date().getTime() - item.lastUpdated) >= 86400000)?
                                                                    (
                                                                      <Moment format="MMMM DD, YYYY" fromNow>{new Date(item.lastUpdated)}</Moment>
                                                                    ):(
                                                                      <Moment fromNow>{new Date(item.lastUpdated)}</Moment>
                                                                    )
                                                                  }
                                                                  </div>
                                                            </div>
                                                       </div>
                                                      <div className="row" style={{marginLeft:'15%'}}>
                                                          <a  className="col-xs-2" style={{display:'none'}} ref={"CancelEdit"+item.id+this.props.id2} onClick={this.cancelEditOnComment.bind(this,item,this.props.id2)}>Cancel</a>
                                                          {
                                                            (AuthUtils.isLoggedIn() && item.author.id==AuthUtils.getLoggedInUser().id)?
                                                            (
                                                              <a  className="col-xs-2" style={{display:'block'}} ref={"Edit"+item.id+this.props.id2} onClick={this.editOnComment.bind(this,item.id,this.props.id2)}>Edit</a>

                                                            ):null
                                                          }
                                                          {
                                                            (AuthUtils.isLoggedIn() && item.author.id==AuthUtils.getLoggedInUser().id)?
                                                            (
                                                              <a  className="col-xs-2" style={{display:'block'}} ref={"Delete"+item.id+this.props.id2} onClick={this.deleteOnComment.bind(this,item.id)}>Delete</a>

                                                            ):null
                                                          }
                                                      </div>
                                                      <div className="row">
                                                      <div className="col-sm-12" style={{display:'none'}} ref={"Editbox"+item.id+this.props.id2}>
                                                      {console.log(item.id,item.text)}
                                                          <RichTextEditor ref={"editOnComment"+this.props.id1} key={"richtextEdit"+this.props.id1+item.id}
                                                                      htm={item.text}
                                                                      //htm={'Thanks <a class="red tagUsers" contenteditable="false" href="http://indiabiodiversity.org/user/show/2920" rel="2920" target="_blank">Muthu Karthick</a> for the ID http://localhost:3000/observation/list?count=0&hasMore=true&max=10&offset=0&sort=lastRevised'}
                                                                      currentCommentId={item.id}
                                                                      getRecoComment={this.getRecoComment}
                                                                      obvId={this.props.id2}
                                                                      chId={this.props.id1}
                                                                      PublicUrl={this.props.PublicUrl}
                                                          />
                                                      </div>
                                                      </div>
                                                  </div>
                                              </li>
                                          )
                                          })
                                          ):null
                                        }
                                    </ul>
                              </div>
                              {
                                this.state.remainingCommentCount && this.state.remainingCommentCount>0?
                                (
                                  <a className="btn btn-small" onClick={this.getRecoComment.bind(this,false,true)}>Show {this.state.remainingCommentCount} more Comment(s)</a>
                                ):null
                              }
                              <input type="hidden" name="olderTimeRef" value/>
                          </div>
                    </div>
            </div>
      }
      </span>
    )
  }

}
function mapStateToProps(state){
return {
  PublicUrl:state.PublicUrl.url
};
}
export default  withRouter(connect(mapStateToProps)(RecoComment));
//export default RecoComment;
