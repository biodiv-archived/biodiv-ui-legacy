import React, {Component} from 'react';
import axios from 'axios';
import Moment from 'react-moment'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ROOT_URL} from '../../Config.js'
import ModalPopup from '../auth/modal.js';
import { MentionsInput, Mention } from 'react-mentions'
import commentWithTagStyle from './commentWithTagStyle.js'

class CommentsFeeds extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      response:null,
      login_modal:false,
      options:'',
      value:''
    }
  }

  getUsers(query, callback){
    var userData
   console.log(query)
   console.log(callback)
   axios.get(ROOT_URL+"/user/terms?term="+query+"&format=json")
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

 fetchFeeds(id){
    var d = new Date();
    var tym = d.getTime();
    console.log(tym)
    var feed1="feedbtn" + id
    this.refs.hasOwnProperty(feed1)?(this.refs[feed1].style.display="none"):null
    axios.get(ROOT_URL+"/activityFeed/getFeeds?rootHolderId="+id+"&rootHolderType=species.participation.Observation&activityHolderId=&activityHolderType=&feedType=Specific&feedCategory=&feedClass=&feedPermission=editable&feedOrder=oldestFirst&subRootHolderId=&subRootHolderType=&feedHomeObjectId="+id+"&feedHomeObjectType=species.participation.Observation&webaddress=&userGroupFromUserProfile=&refreshType=manual&timeLine=older&refTime="+tym+"&user=&")
        .then((response)=>{
          console.log(response.data)
          this.setState({
            response:response.data.model
          })
        })
  }

  commentPost(e){
    e.preventDefault();
    var id1=this.props.id;
    var obvComment1="obvComment"+this.props.id
    console.log("tag",this.refs[obvComment1].props.value)
    var value1=this.refs[obvComment1].props.value
    var d = new Date();
    var tym = d.getTime();
    var options={
      method:'POST',
      url :   ROOT_URL+"/api/comment/addComment?commentHolderId="+id1+"&commentHolderType=species.participation.Observation&rootHolderId="+id1+"&rootHolderType=species.participation.Observation&commentBody="+value1+"&newerTimeRef="+tym,
      headers :{
        'X-Auth-Token' : localStorage.getItem('token'),
        'X-AppKey'     : "8acc2ea1-2cfc-4be5-8e2d-560b7c4cc288",
        'Accept'        :"application/json"
      },
      json: 'true'
    }
    this.setState({
      value:''
    })
    axios(options)
        .then((response)=>{
          console.log("comment",response)
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


  render(){
    return(
      <div>
      {this.state.login_modal==true?(<ModalPopup key={this.state.options} options={this.state.options} />):null}
        <div className=" union-comment" id={this.props.id+"_comments"} >
            <div className="activityfeed activityfeedSpecific" >
                  <input type="hidden" name="newerTimeRef" value="1502258631007"/>
                  <input type="hidden" name="olderTimeRef" value="1502258631007"/>
                  <input type="hidden" name="feedType" value="Specific"/>
                  <input type="hidden" name="feedCategory" value=""/>
                  <input type="hidden" name="feedClass" value=""/>
                  <input type="hidden" name="feedOrder" value="oldestFirst"/>
                  <input type="hidden" name="feedPermission" value="editable"/>
                  <input type="hidden" name="refreshType" value="manual"/>
                  <input type="hidden" name="rootHolderId" value="1747730"/>
                  <input type="hidden" name="rootHolderType" value="species.participation.Observation"/>
                  <input type="hidden" name="activityHolderId" value=""/>
                  <input type="hidden" name="activityHolderType" value=""/>
                  <input type="hidden" name="feedUrl" value="/activityFeed/getFeeds"/>
                  <input type="hidden" name="webaddress" value=""/>
                  <input type="hidden" name="user" value=""/>
                  <input type="hidden" name="userGroupFromUserProfile" value=""/>
                  <input type="hidden" name="subRootHolderId" value=""/>
                  <input type="hidden" name="subRootHolderType" value=""/>
                  <input type="hidden" name="feedHomeObjectId" value="1747730"/>
                  <input type="hidden" name="feedHomeObjectType" value="species.participation.Observation"/>
                  <div className="row" style={{margin:'2%'}}>
                      <a className="activiyfeednewermsg yj-thread-replies-container yj-show-older-replies" style={{display:'none'}} href="#" title="load new feeds" >Click to see  feeds</a>
                      <a className="activiyfeedoldermsg yj-thread-replies-container yj-show-older-replies" style={{display:'block'}}  title="show feeds" ref={"feedbtn"+this.props.id} onClick={this.fetchFeeds.bind(this,this.props.id)}>Show  older feeds </a>
                  </div>
                  <ul className="list-unstyled row" id={this.props.id+"feedlist"} style={{width:'95%',margin:'2%'}}>
                      {
                        this.state.response?(
                          this.state.response.feeds.map((item)=>{
                            return(
                              <li  style={{display:'list-item'}}>
                                  <div className="activityFeed-Container row well well-sm">
                                      <div className="row">
                                            <div  className="author-icon col-sm-1">
                                                <a href={"http://localhost.indiabiodiversity.org/user/show/" + item.author.id}>
                                                    <img className="small-profile-pic" src={item.author.icon} title={item.author.name} height='40px' width='40px'/>
                                                </a>
                                            </div>
                                            <div className="feed col-sm-10" style={{margin:'1%'}}>
                                                <div className="row">
                                                  <b>
                                                      {item.author.name}   :
                                                      <span className="yj-context text-success">  {item.activityType}
                                                          <a href>
                                                              <i>  {item.activityDescription}</i>
                                                          </a>
                                                      </span>
                                                  </b>
                                                </div>
                                                <div className="row" >
                                                    <time className="timeago"><Moment date={item.dateCreated}/></time>
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
            </div>
            <div className="comment row" style={{width:'95%',margin:'2%'}}>
                    <form className="form-horizontal post-comment-form" onSubmit={this.commentPost.bind(this)}>
                        <textarea name="commentBody"  className="comment-textbox" placeholder="Write comment on observation" style={{display:'block',width:'100%'}}></textarea>
                        <MentionsInput
                            ref={"obvComment"+this.props.id}
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                            style={commentWithTagStyle}
                            placeholder="Write Comment on Observation"
                         >
                            <Mention trigger="@"
                                data={this.getUsers.bind(this)}
                                style={{backgroundColor: '#90D547'}}
                              />

                        </MentionsInput>

                        <input type="hidden" name="tagUserId" className="tagUserId" value=""/>
                        <span style={{color:'#B84A48', display:'none'}}>Please write comment</span>
                        <input type="hidden" name="commentHolderId" value="1747730"/>
                        <input type="hidden" name="commentHolderType" value="species.participation.Observation"/>
                        <input type="hidden" name="rootHolderId" value="1747730"/>
                        <input type="hidden" name="rootHolderType" value="species.participation.Observation"/>
                        <input type="hidden" name="commentType" value="super"/>
                        <input type="hidden" name="newerTimeRef" value="1502258631008"/>
                        <input type="hidden" name="commentPostUrl" value="/comment/addComment"/>
                        <input type="submit" value="Post" className="btn comment-post-btn " style={{float:'right'}} onClick={this.commentPost.bind(this)}/>
                  </form>
            </div>
       </div>

    </div>
    )
  }
}
export default CommentsFeeds;
