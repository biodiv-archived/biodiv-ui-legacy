import React, {Component} from 'react';
import axios from 'axios';
import {ROOT_URL} from '../../actions/index.js'
import Moment from 'react-moment'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class RecoComment extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      response:''
    }

    this.getRecoComment=this.getRecoComment.bind(this)
    this.getRecoComment(this.props.id1,this.props.id2)

  }

  getRecoComment(id1,id2){
    var d = new Date();
    var tym = d.getTime();
    axios.get(ROOT_URL+"/api/comment/getComments?commentHolderId="+id1+"&commentHolderType=species.participation.Observation&rootHolderId="+id2+"&max=3%20&rootHolderType=species.participation.Observation&refTime="+tym+"&%20timeLine=older&format=json")
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


agreePost(){
  console.log(this.props.Login)
  var token=this.props.Login
  var obId=this.props.id2;
  var recId=this.props.id1;
  var votes=this.props.votes;
  console.log(obId,recId)
  var options={
    method: 'POST',
    url :   ROOT_URL+"/api/observation/addAgreeRecommendationVote?obvId="+obId+"&recoId="+recId+"&currentVotes="+votes,
    headers :{
      'X-Auth-Token' : token,
      'X-AppKey'     : "87aae8c4-7b84-4539-b8a3-42ff737eda0a",
      'Accept'        :"text/json"
    },
    json: 'true'
  }
  axios(options)
        .then((response)=>{
          console.log("agree",response)
        })
}

recoCommentPost(e){
  e.preventDefault();
  var token=this.props.Login
  var id1=this.props.id1;
  var id2=this.props.id2;
  var recoComment1="recoComment"+this.props.id2+this.props.id1
  var value1=this.refs[recoComment1].value
  var d = new Date();
  var tym = d.getTime();
  var options={
    method:'POST',
    url :   ROOT_URL+"/api/comment/addComment?commentHolderId="+id1+"&commentHolderType=species.participation.Observation&rootHolderId="+id2+"&rootHolderType=species.participation.Observation&commentBody="+value1+"&newerTimeRef="+tym,
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

    this.refs[recoComment1].value="";
  }


render(){
      return(
      <div>{
        this.state.response.hasOwnProperty('data')?
        (
        <div className="btnagree row ">
                <div className="col-sm-7">
                    <button id={"agreeBtn"+this.props.id2+this.props.id1} className="btn btn-primary btn-small nameAgree "  onClick={this.agreePost.bind(this)}>agree</button>
                </div>
                <div className="comment-popup dropdown col-sm-5" ref={"popup"}>

                    <a className="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#" onClick={this.show.bind(this,this.props.id2,this.props.id1)}>
                                <span className="glyphicon glyphicon-comment"></span>
                                {" "}
                    {this.state.response.data.model.hasOwnProperty('instanceList')?(this.state.response.data.model.instanceList.length):null}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right container col-sm-12" style={{width:'500px'}}>
                          <div className="reco-comment-table" ref={"comment_table"+this.props.id2+this.props.id1} style={{display:'none'}} >
                              <div className="post-comment" style={{width:'100%'}}>
                                  <form className="form-horizontal post-comment-form" style={{top:'3px'}} onSubmit={this.recoCommentPost.bind(this)}>
  		                                <textarea ref={"recoComment"+this.props.id2+this.props.id1} name="commentBody" className="comment-textbox col-md-offset-1" placeholder="Write comment on species call" style={{width:'80%'}}></textarea>
  		                                <span style={{color:'#B84A48',display:'none'}}>Please write comment</span>
  		                                <input type="hidden" name="commentHolderId" value="954769"/>
  		                                <input type="hidden" name="commentHolderType" value="species.participation.Recommendation"/>
  		                                <input type="hidden" name="rootHolderId" value="1748655"/>
  		                                <input type="hidden" name="rootHolderType" value="species.participation.Observation"/>
  		                                <input type="hidden" name="commentType" value="context"/>
  		                                <input type="hidden" name="newerTimeRef" value="1502431496258"/>
  		                                <input type="hidden" name="commentPostUrl" value="/comment/addComment"/>
  		                                <input type="submit" value="Post" className="btn comment-post-btn btn-sm" />
  	                              </form>
                              </div>
                              <li className="divider row"></li>
                              <div className="previous-comments-container">
                                   <ul>
                                      {
                                          this.state.response.data.model.hasOwnProperty('instanceList')?(this.state.response.data.model.instanceList.map((item)=>{
                                            return(
                                              <li className="list-unstyled">
                                                  <div className="comment-container well well-sm" style={{width:'90%'}}>
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
                                                                    item.text
                                                                  }
                                                                  </div>
                                                                  <div className="comment-attributes">
                                                                      <time className="timeago" datetime={this.state.response.data.model.olderTimeRef}>
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
                              </div>
                              <input type="hidden" name="olderTimeRef" value/>
                          </div>
                    </ul>
                </div>
        </div>


      ):null
      }
      </div>
    )
  }

}

function mapStateToProps(state){
return {Login:state.Login};
}

function mapDispatchToProps(dispatch){


}

 export default connect(mapStateToProps,mapDispatchToProps)(RecoComment);
