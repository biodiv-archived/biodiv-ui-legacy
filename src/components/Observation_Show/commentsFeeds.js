import React, {Component} from 'react';
import axios from 'axios';
import Moment from 'react-moment'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ROOT_URL} from '../../actions/index.js'
class CommentsFeeds extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      response:null
    }
  }

  commentPost(e){
    e.preventDefault();
    var token=this.props.Login
    var options={
      method:'POST',
      url :   ROOT_URL+"/api/comment/addComment?commentHolderId=245&commentHolderType=species.participation.Observation&rootHolderId=245&rootHolderType=species.participation.Observation&commentBody=test comment&newerTimeRef=1403071938526",
      headers :{
        'X-Auth-Token' : token,
        'X-AppKey'     : "87aae8c4-7b84-4539-b8a3-42ff737eda0a",
        'Accept'        :"application/json"
      },
      json: 'true'
    }

    axios(options)
        .then((response)=>{
          console.log("comment",response)
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
    var token=this.props.Login
    var id1=this.props.id;
    var obvComment1="obvComment"+this.props.id
    var value1=this.refs[obvComment1].value
    var d = new Date();
    var tym = d.getTime();
    var options={
      method:'POST',
      url :   ROOT_URL+"/api/comment/addComment?commentHolderId="+id1+"&commentHolderType=species.participation.Observation&rootHolderId="+id1+"&rootHolderType=species.participation.Observation&commentBody="+value1+"&newerTimeRef="+tym,
      headers :{
        'X-Auth-Token' : token,
        'X-AppKey'     : "87aae8c4-7b84-4539-b8a3-42ff737eda0a",
        'Accept'        :"application/json"
      },
      json: 'true'
    }

    axios(options)
        .then((response)=>{
          console.log("comment",response)
        })

      this.refs[obvComment1].value="";
  }


  render(){
    return(
      <div>
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
                    <form className="form-horizontal post-comment-form" onsubmit={this.commentPost.bind(this)}>
                        <textarea name="commentBody" ref={"obvComment"+this.props.id} className="comment-textbox" placeholder="Write comment on observation" style={{display:'block',width:'100%'}}></textarea>
                        <div className="commentContainer">
                            <div className="contentbox" contenteditable="true"></div>
                            <div className="display"></div>
                            <div className="msgbox"></div>
                        </div>
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
function mapStateToProps(state){
return {Login:state.Login};
}

function mapDispatchToProps(dispatch){


}

 export default connect(mapStateToProps,mapDispatchToProps)(CommentsFeeds);
