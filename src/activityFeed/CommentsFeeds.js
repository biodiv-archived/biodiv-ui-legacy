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
import RichTextEditor from '../util/richEditor/RichTextEditor.js'

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
    this.fetchFeeds = this.fetchFeeds.bind(this);
  }

  componentDidMount(){
    this.fetchFeeds(this.props.id);
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
           data.userpic=user.user_pic
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

 fetchFeeds(id,first){
   //console.log("fetchFeeds calllllllllled",first)
   //console.log("sdhyfsfhyshs",this)
   //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    var refTime;
    if(first === true)
    {
      this.setState({
        response:[]
      });
      console.log("inside fistr ttrue")
      console.log(this.fetchCount,this.state.response)
      this.fetchCount=0;
    }
    console.log("fetchcouint",this.fetchCount)
    if(this.fetchCount>0){
      refTime = this.refTym
    }else{
      var d = new Date();
      var tym = d.getTime();
      refTime = tym;
    }
    var feed1="feedbtn" + id
    var feedMore="moreFeedBtn"+id
    console.log("in the fecth feeds")
    axios.get(Config.api.API_ROOT_URL+"/activityFeed/feeds?rootHolderId="+id+"&rootHolderType=species.participation.Observation&feedType=specific&feedPermission=editable&feedOrder=oldestFirst&refreshType=manual&timeLine=older&refTime="+refTime+"&max=2")
        .then((response)=>{
          console.log(response.data)
        //  this.refs.hasOwnProperty(feed1)?(this.refs[feed1].style.display="none"):null
        //  this.refs.hasOwnProperty(feedMore)?(this.refs[feedMore].style.display="block"):null
          if(response.data.remainingFeedCount ==0){
            this.refs.hasOwnProperty(feedMore)?(this.refs[feedMore].style.display="none"):null
          }else{
            this.refs.hasOwnProperty(feedMore)?(this.refs[feedMore].style.display="block"):null
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
    this.refs[obvComment1]?console.log("tag*************************************************",this.refs[obvComment1]):null
    // var value1=this.refs[obvComment1].props.value
    // var d = new Date();
    // var tym = d.getTime();
    // var options={
    //   method:'POST',
    //   url :   Config.api.ROOT_URL+"/api/comment/addComment?commentHolderId="+id1+"&commentHolderType=species.participation.Observation&rootHolderId="+id1+"&rootHolderType=species.participation.Observation&commentBody="+value1+"&newerTimeRef="+tym,
    //   headers : AuthUtils.getAuthHeaders(),
    //   json: 'true'
    // }
    // if(value1!=="")
    // {
    // this.setState({
    //   value:''
    // })
    // axios(options)
    //     .then((response)=>{
    //       console.log("comment",response)
    //     })
    //     .catch((response)=>{
    //       (response=="Error: Request failed with status code 401")?
    //       (
    //         this.setState({
    //         login_modal:!(this.state.login_modal),
    //         options:options
    //       })
    //
    //       ):console.log("fofoofof")
    //     })
    //   }

  }

  replyOnComment(id){
    var rep = "Reply"+id;
    var canRep ="CancelReply"+id
    var box = "Replybox"+id;
    var box2 = "Editbox"+id;
    var edit = "Edit"+id;
    var del = "Delete"+id;
    //var postBtn = "Replypost"+id
    this.refs.hasOwnProperty(rep)?(this.refs[rep].style.display="none"):null
    this.refs.hasOwnProperty(edit)?(this.refs[edit].style.display="none"):null
    this.refs.hasOwnProperty(del)?(this.refs[del].style.display="none"):null
    this.refs.hasOwnProperty(canRep)?(this.refs[canRep].style.display="block"):null
    this.refs.hasOwnProperty(box2)?(this.refs[box2].style.display="none"):null
    this.refs.hasOwnProperty(box)?(this.refs[box].style.display="block"):null
    //this.refs.hasOwnProperty(postBtn)?(this.refs[postBtn].style.display="block"):null
  }

  editOnComment(id){
    var del = "Delete"+id;
    var rep = "Reply"+id;
    var edit = "Edit"+id;
    var box = "Replybox"+id;
    var box2 = "Editbox"+id;
    var canEdit ="CancelEdit"+id;
    this.refs.hasOwnProperty(edit)?(this.refs[edit].style.display="none"):null
    this.refs.hasOwnProperty(rep)?(this.refs[rep].style.display="none"):null
    this.refs.hasOwnProperty(del)?(this.refs[del].style.display="none"):null
    this.refs.hasOwnProperty(canEdit)?(this.refs[canEdit].style.display="block"):null
    this.refs.hasOwnProperty(box2)?(this.refs[box2].style.display="block"):null
    this.refs.hasOwnProperty(box)?(this.refs[box].style.display="none"):null
  }

  deleteOnComment(id){
    console.log("deleteonCommmmmmmmmmmment",id)
    var options={
       method:'POST',
       url :   Config.api.API_ROOT_URL+"/comment/removeComment?commentId="+id,
       headers : AuthUtils.getAuthHeaders(),
       json: 'true'
     }
     axios(options)
         .then((response)=>{
           console.log("comment",response)
           console.log(this.props.fetchFeeds)
           this.fetchFeeds(this.props.id,true);
         })
          .catch((error)=>{
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

  cancelReplyOnComment(item){
    var rep = "Reply"+item.id;
    var box = "Replybox"+item.id;
    var box2 = "Editbox"+item.id;
    var canRep ="CancelReply"+item.id;
    var edit = "Edit"+item.id;
    var del = "Delete"+item.id;
    //var postBtn = "Replypost"+id
    this.refs.hasOwnProperty(canRep)?(this.refs[canRep].style.display="none"):null
    this.refs.hasOwnProperty(rep)?(this.refs[rep].style.display="block"):null

    if(AuthUtils.isLoggedIn() && item.author.id==AuthUtils.getLoggedInUser().id){
      this.refs.hasOwnProperty(edit)?(this.refs[edit].style.display="block"):null
      this.refs.hasOwnProperty(del)?(this.refs[del].style.display="block"):null
    }
    this.refs.hasOwnProperty(box2)?(this.refs[box2].style.display="none"):null
    this.refs.hasOwnProperty(box)?(this.refs[box].style.display="none"):null
    //this.refs.hasOwnProperty(postBtn)?(this.refs[postBtn].style.display="none"):null
  }

  cancelEditOnComment(item){
    var rep = "Reply"+item.id;
    var box = "Replybox"+item.id;
    var box2 = "Editbox"+item.id;
    var canEdit ="CancelEdit"+item.id;
    var edit = "Edit"+item.id;
    var del = "Delete"+item.id;
    this.refs.hasOwnProperty(canEdit)?(this.refs[canEdit].style.display="none"):null
    this.refs.hasOwnProperty(rep)?(this.refs[rep].style.display="block"):null

    if(AuthUtils.isLoggedIn() && item.author.id==AuthUtils.getLoggedInUser().id){
      this.refs.hasOwnProperty(edit)?(this.refs[edit].style.display="block"):null
      this.refs.hasOwnProperty(del)?(this.refs[del].style.display="block"):null
    }
    this.refs.hasOwnProperty(box2)?(this.refs[box2].style.display="none"):null
    this.refs.hasOwnProperty(box)?(this.refs[box].style.display="none"):null
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

  displayTransform(id,display,type){
    console.log("tetsing mentions input",id)
    console.log("testing display",display)
    console.log("testing type",type)
    //var ids = ${id};
    //var displays = ${display}
    var ids = id.toString();
    var displays = display.toString();
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",ids)
    //var test =
    console.log("***********************************",<a href={Config.api.ROOT_URL+"/user/show/"+id}>{display}</a>)
    var url = Config.api.ROOT_URL+"/user/show"+id
    var ht = "<a "+"href='"+url+"' >"+display+"</a>";
    console.log("9999999999999999999999999999999",ht)
    return display;
  }

  renderSuggestion(entry,search, highlightedDisplay, index){
    console.log("testing entry",entry)
    console.log("testing search",search)
    console.log("testing highlightedDisplay",highlightedDisplay)
    console.log("testing index",index)
    return (
            <div className="row">
                <span className="col-sm-4"><img src={entry.userpic} height='40px' width='40px'/></span>
                <span className="col-sm-8"><b><h5><a href={Config.api.ROOT_URL+"/user/show/"+entry.id}>{entry.display}</a></h5></b></span>
            </div>
          )
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
                      <a className="activiyfeednewermsg " style={{display:'block'}}  title="load new feeds" ref={"moreFeedBtn"+this.props.id} onClick={this.fetchFeeds.bind(this,this.props.id)}>{"Show "+this.state.remainingFeedCount+ " older Feed(s)"}</a>
                      {/*<a className="activiyfeedoldermsg " style={{display:'block'}} title="show feeds" ref={"feedbtn"+this.props.id} onClick={this.fetchFeeds.bind(this,this.props.id)}>Show  older feeds </a>*/}
                  </div>
                  <ul className="list-unstyled row pre-scrollable" id={this.props.id+"feedlist"} style={{width:'99%',marginLeft:'0.5%',marginTop:'0.2%',marginBottom:'2%'}}>
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
                                                          {
                                                            item.descriptionJson.ro_type === "userGroup"?
                                                            (
                                                              <a href={this.getGroupUrlById(item.descriptionJson.ro_id)}>
                                                              {item.descriptionJson.name}
                                                              </a>
                                                            ):
                                                            (
                                                              <a href={"http://indiabiodiversity.org/"+item.descriptionJson.ro_type+"/show/"+item.descriptionJson.ro_id}>
                                                              {item.descriptionJson.name}
                                                              </a>
                                                            )
                                                          }

                                                          </span>

                                                      </b>
                                                    </div>
                                                    <div className = "description row" style={{color:'#3B2F2F'}}>
                                                        <span className="parse" style={{wordWrap:'break-word'}} dangerouslySetInnerHTML={{ __html: item.descriptionJson.description }} />
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
                                                      (item.descriptionJson.activity_performed == 'Added a comment' || item.descriptionJson.activity_performed == 'In reply to')?
                                                      (
                                                        <div>
                                                        <div className="row">
                                                            <a  className="col-xs-2" style={{display:'block'}} ref={"Reply"+item.id} onClick={this.replyOnComment.bind(this,item.id)}>Reply</a>
                                                            <a  className="col-xs-2" style={{display:'none'}} ref={"CancelReply"+item.id} onClick={this.cancelReplyOnComment.bind(this,item)}>Cancel</a>
                                                            {
                                                              (AuthUtils.isLoggedIn() && item.author.id==AuthUtils.getLoggedInUser().id)?
                                                              (
                                                                <a  className="col-xs-2" style={{display:'block'}} ref={"Edit"+item.id} onClick={this.editOnComment.bind(this,item.id)}>Edit</a>

                                                              ):null
                                                            }
                                                            <a  className="col-xs-2" style={{display:'none'}} ref={"CancelEdit"+item.id} onClick={this.cancelEditOnComment.bind(this,item)}>Cancel</a>
                                                            {
                                                              (AuthUtils.isLoggedIn() && item.author.id==AuthUtils.getLoggedInUser().id)?
                                                              (
                                                                <a  className="col-xs-2" style={{display:'block'}} ref={"Delete"+item.id} onClick={this.deleteOnComment.bind(this,item.activityHolderId)}>Delete</a>
                                                              ):null
                                                            }
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-12" style={{display:'none'}} ref={"Replybox"+item.id}>
                                                                <RichTextEditor ref={"replyOnComment"+this.props.id} key={"richtextReply"+this.props.id}

                                                                            parentCommentId={item.activityHolderId}
                                                                            getFeeds={this.fetchFeeds}
                                                                            obvId={this.props.id}
                                                                            chId={this.props.id}
                                                                />
                                                            </div>
                                                            <div className="col-sm-12" style={{display:'none'}} ref={"Editbox"+item.id}>
                                                                <RichTextEditor ref={"editOnComment"+this.props.id} key={"richtextEdit"+this.props.id}
                                                                            htm={item.descriptionJson.description}
                                                                            //htm={'Thanks <a class="red tagUsers" contenteditable="false" href="http://indiabiodiversity.org/user/show/2920" rel="2920" target="_blank">Muthu Karthick</a> for the ID http://localhost:3000/observation/list?count=0&hasMore=true&max=10&offset=0&sort=lastRevised'}
                                                                            currentCommentId={item.activityHolderId}
                                                                            getFeeds={this.fetchFeeds}
                                                                            obvId={this.props.id}
                                                                            chId={this.props.id}
                                                                />
                                                            </div>
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
            <div className="comment">
                <RichTextEditor ref={"obvComment"+this.props.id} key={"richtextComment"+this.props.id}
                            //htm={'Thanks <a class="red tagUsers" contenteditable="false" href="http://indiabiodiversity.org/user/show/2920" rel="2920" target="_blank">Muthu Karthick</a> for the ID http://localhost:3000/observation/list?count=0&hasMore=true&max=10&offset=0&sort=lastRevised'}
                            obvId={this.props.id}
                            chId={this.props.id}
                            getFeeds={this.fetchFeeds}
                />
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
