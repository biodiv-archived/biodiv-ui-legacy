import React, {Component} from 'react';
import axios from 'axios';
import Moment from 'react-moment'
import ReactTimeAgo from 'react-time-ago'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { MentionsInput, Mention } from 'react-mentions'

import commentWithTagStyle from '../observation/commentWithTagStyle.js'

import { Config } from '../Config';
import ModalPopup from '../auth/Modal.js';
import AuthUtils from '../auth/AuthUtils.js';
import UserGroup from '../util/UserGroup';

var  abc= 'nrewurl';
class CommentsFeeds extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      response:[],
      login_modal:false,
      options:'',
      value:'',
      remainingFeedCount:null
    }
    this.semiFeeds=[];
    this.res=[];
    this.refTym='';
    this.fetchCount=0;
    this.currentHrefForUsergroup='';
    this.getGroupUrlById = this.getGroupUrlById.bind(this);
  }

  getUsers(query, callback){
    var userData
   console.log(query)
   console.log(callback)
   axios.get(Config.api.ROOT_URL+"/user/terms?term="+query+"&format=json")
       .then((response)=>{
         console.log("user response",response)
        let data1= response.data.map((user,index)=>{
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
    var refTime;
    if(this.fetchCount>0){
      refTime = this.refTym
    }else{
      var d = new Date();
      var tym = d.getTime();
      refTime = tym;
    }
    var feed1="feedbtn" + id
    var feedMore="moreFeedBtn"+id
    axios.get("http://localhost:8090/biodiv-api"+"/activityFeed/feeds?rootHolderId="+id+"&rootHolderType=species.participation.Observation&feedType=specific&feedPermission=editable&feedOrder=oldestFirst&refreshType=manual&timeLine=older&refTime="+refTime+"&max=5")
        .then((response)=>{
          console.log(response.data)
          this.refs.hasOwnProperty(feed1)?(this.refs[feed1].style.display="none"):null
          this.refs.hasOwnProperty(feedMore)?(this.refs[feedMore].style.display="block"):null
          if(response.data.remainingFeedCount ==0){
            this.refs.hasOwnProperty(feedMore)?(this.refs[feedMore].style.display="none"):null
          }
          if(response.data){

          this.semiFeeds=response.data.model.feeds
          this.semiFeeds=this.semiFeeds.concat(this.state.response)
          console.log("semifeeeeds",this.semiFeeds)
          this.setState({
            response:this.semiFeeds,
            remainingFeedCount:response.data.remainingFeedCount
          })
          this.refTym = response.data.olderTimeRef
          this.fetchCount++
         }
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
      url :   Config.api.ROOT_URL+"/api/comment/addComment?commentHolderId="+id1+"&commentHolderType=species.participation.Observation&rootHolderId="+id1+"&rootHolderType=species.participation.Observation&commentBody="+value1+"&newerTimeRef="+tym,
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

  }

  replyOnComment(id){
    var rep = "Reply"+id;
    var box = "Replybox"+id;
    var postBtn = "Replypost"+id
    this.refs.hasOwnProperty(rep)?(this.refs[rep].style.display="none"):null
    this.refs.hasOwnProperty(box)?(this.refs[box].style.display="block"):null
    this.refs.hasOwnProperty(postBtn)?(this.refs[postBtn].style.display="block"):null
  }

  cancelReplyOnComment(id){
    var rep = "Reply"+id;
    var box = "Replybox"+id;
    var postBtn = "Replypost"+id
    this.refs.hasOwnProperty(rep)?(this.refs[rep].style.display="block"):null
    this.refs.hasOwnProperty(box)?(this.refs[box].style.display="none"):null
    this.refs.hasOwnProperty(postBtn)?(this.refs[postBtn].style.display="none"):null
  }

  getGroupUrlById(groupId){
    var url = '';
    if(this.props.UserGroupList)
    {
      if(this.props.UserGroupList.length>0){

        for(var i =0 ;i<this.props.UserGroupList.length;i++){
            if(this.props.UserGroupList[i].id==groupId){
              if(this.props.UserGroupList[i].domainName !== null){
                url = this.props.UserGroupList[i].domainName;
                break;
              }else{
                url= Config.api.ROOT_URL+"/group/"+this.props.UserGroupList[i].webaddress+"/show";
               break;
              }
            }
        }
          return url;
      }
    }

  }

  render(){
    return(
      <div style={{marginTop:'1%'}}>
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
                  <div className="row" style={{marginLeft:'2%'}}>
                      <a className="activiyfeednewermsg " style={{display:'none'}}  title="load new feeds" ref={"moreFeedBtn"+this.props.id} onClick={this.fetchFeeds.bind(this,this.props.id)}>{"Show "+this.state.remainingFeedCount+ " older Feed(s)"}</a>
                      <a className="activiyfeedoldermsg " style={{display:'block'}} title="show feeds" ref={"feedbtn"+this.props.id} onClick={this.fetchFeeds.bind(this,this.props.id)}>Show  older feeds </a>
                  </div>
                  <ul className="list-unstyled row" id={this.props.id+"feedlist"} style={{width:'99%',marginLeft:'0.5%',marginTop:'0.2%',marginBottom:'2%'}}>
                      {
                        this.state.response?(
                          this.state.response.length>0?(
                          this.state.response.map((item,index)=>{
                            return(
                              <li key={index} style={{display:'list-item'}}>
                                  <div className="activityFeed-Container row well well-sm" style={{marginLeft:'0.1%',marginTop:'0.2%',marginBottom:'0.2%',marginRight:'0.1%'}}>
                                      <div className="row">
                                            <div  className="author-icon col-sm-1">
                                                <a href={Config.api.ROOT_URL+"/user/show/" + item.author.id}>
                                                    {
                                                      item.author.icon?
                                                      (
                                                        <img className="small-profile-pic" src={"http://indiabiodiversity.org/"+"biodiv/users"+item.author.icon} alt={"Avatar"} title={item.author.name} height='40px' width='40px' style={{borderRadius:'50%'}}/>
                                                      ):
                                                      (
                                                        <img className="small-profile-pic" src={"http://indiabiodiversity.org/"+"biodiv/users"+"/user.png"} alt={"Avatar"} title={item.author.name} height='40px' width='40px' style={{borderRadius:'50%'}}/>
                                                      )
                                                    }
                                                </a>
                                            </div>
                                            {
                                              (item.activityType == 'Suggested species name' || item.activityType == 'obv unlocked' || item.activityType == 'obv locked' ||
                                              item.activityType == 'Agreed on species name' || item.activityType == 'Suggestion removed')?
                                              (
                                                <div className="feed col-sm-10" style={{marginLeft:'5%'}}>
                                                    <div className="row">
                                                      <b>
                                                          {item.author.name}   :
                                                          <span className="yj-context text-success">  {item.descriptionJson.activity_performed + ' '}
                                                              {
                                                                (item.descriptionJson.name && item.descriptionJson.ro_id)?
                                                                (
                                                                  item.descriptionJson.is_scientific_name?
                                                                  (
                                                                    <a href={"http://indiabiodiversity.org/"+item.descriptionJson.ro_type+"/show/"+item.descriptionJson.ro_id}>
                                                                        <i>{item.descriptionJson.name}</i>
                                                                    </a>
                                                                  )
                                                                  :
                                                                  (
                                                                    <a href={"http://indiabiodiversity.org/"+item.descriptionJson.ro_type+"/show/"+item.descriptionJson.ro_id}>
                                                                      {item.descriptionJson.name}
                                                                    </a>
                                                                  )
                                                                )
                                                                :
                                                                (
                                                                  item.descriptionJson.description?
                                                                  (
                                                                    <span className="parse" dangerouslySetInnerHTML={{ __html: item.descriptionJson.description }} />
                                                                  )
                                                                  :
                                                                  (
                                                                    item.descriptionJson.name?
                                                                    (
                                                                      item.descriptionJson.is_scientific_name?
                                                                      (
                                                                        <i style={{color:'#337ab7'}}>{item.descriptionJson.name}</i>
                                                                      )
                                                                      :
                                                                      (
                                                                        <span style={{color:'#337ab7'}}>{item.descriptionJson.name}</span>
                                                                      )
                                                                    ):null
                                                                  )
                                                                )
                                                              }
                                                          </span>
                                                      </b>
                                                    </div>
                                                    {
                                                      item.activityType != 'Suggestion removed'?
                                                      (
                                                        item.descriptionJson.description?
                                                        (
                                                          <div className = "description row" style={{color:'#3B2F2F'}}>
                                                              <span className="parse" dangerouslySetInnerHTML={{ __html: "Given name: "+item.descriptionJson.description }} />
                                                          </div>
                                                        ):null
                                                      ):null
                                                    }
                                                    <div className="row" style={{marginTop:'1%'}}>
                                                        {
                                                          (new Date().getTime() - item.lastUpdated)>172800000?
                                                          (
                                                            <time className="timeago"><Moment date={item.lastUpdated}/></time>
                                                          ):
                                                          (
                                                            <ReactTimeAgo locale={'en-GB'}>{item.lastUpdated}</ReactTimeAgo>
                                                          )
                                                        }
                                                    </div>
                                                </div>
                                              )
                                              :
                                              (
                                                <div className="feed col-sm-10" style={{marginLeft:'5%'}}>
                                                    <div className="row">
                                                      <b>
                                                          {item.author.name}   :
                                                          <span className="yj-context text-success">  {item.descriptionJson.activity_performed + ' '}

                                                              <a href={this.getGroupUrlById(item.descriptionJson.ro_id)}>
                                                                {item.descriptionJson.name}
                                                              </a>
                                                          </span>

                                                      </b>
                                                    </div>
                                                    <div className = "description row" style={{color:'#3B2F2F'}}>
                                                        <span style={{wordWrap:'break-word'}}> {item.descriptionJson.description} </span>
                                                    </div>
                                                    <div className="row" style={{marginTop:'1%'}}>
                                                    {
                                                      (new Date().getTime() - item.lastUpdated)>172800000?
                                                      (
                                                        <time className="timeago"><Moment date={item.lastUpdated}/></time>
                                                      ):
                                                      (
                                                        <ReactTimeAgo locale={'en-GB'}>{item.lastUpdated}</ReactTimeAgo>
                                                      )
                                                    }
                                                    </div>
                                                    {
                                                      (item.descriptionJson.activity_performed == 'Added a comment')?
                                                      (
                                                        <div className="row">
                                                            <a  style={{display:'block'}} ref={"Reply"+item.id} onClick={this.replyOnComment.bind(this,item.id)}>Reply</a>
                                                            <div className="col-sm-9 pull-left" style={{display:'none'}} ref={"Replybox"+item.id}>
                                                                <MentionsInput
                                                                    //ref={"obvComment"+this.props.id}
                                                                    value={this.state.value}
                                                                    onChange={this.handleChange.bind(this)}
                                                                    style={commentWithTagStyle}
                                                                    placeholder="Reply on comment"
                                                                 >
                                                                    <Mention trigger="@"
                                                                        data={this.getUsers.bind(this)}
                                                                        style={{backgroundColor: '#90D547'}}
                                                                      />

                                                                </MentionsInput>
                                                            </div>
                                                            <div className="col-sm-2 pull-right" style={{display:'none',marginRight:'0%',float:'right'}} ref={"Replypost"+item.id}>
                                                              <input type="submit" value="Post" className="btn btn-xs comment-post-btn " style={{float:'right'}} />
                                                            </div>
                                                        </div>
                                                      ):null
                                                    }
                                                </div>
                                              )
                                            }
                                       </div>
                                  </div>
                              </li>
                            )
                          })
                        ):null
                      ):null
                      }
                  </ul>
            </div>
            <div className="comment" >
                    <form className="form-horizontal post-comment-form" onSubmit={this.commentPost.bind(this)}>
                        <div className="row">
                          <div className="col-sm-9" style={{marginLeft:'2%',width:'85%'}}>
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
                          </div>
                          <div className="col-sm-1 pull-right" style={{marginRight:'2%'}}>
                            <input type="submit" value="Post" className="btn btn-xs comment-post-btn " style={{float:'right'}} onClick={this.commentPost.bind(this)}/>
                          </div>
                        </div>
                  </form>
            </div>
       </div>

    </div>
    )
  }
}
//export default CommentsFeeds;
function mapStateToProps(state){
return {UserGroupList:state.UserGroupList};
}

function mapDispatchToProps(dispatch){
  return null;
}

 export default connect(mapStateToProps)(CommentsFeeds);
