import React, { Component } from 'react';
import axios from 'axios'
import { Config } from '../../Config';
import ModalPopup from '../../auth/Modal.js';
import { CompositeDecorator,
        ContentBlock,
        ContentState,
        EditorState,
        convertFromHTML,convertToRaw } from 'draft-js';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Editor from 'draft-js-plugins-editor';
import 'draft-js-mention-plugin/lib/plugin.css';
import createMentionPlugin,{ defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import editorStyles from'./editorStyles.css';
import './editorStyles.css';
//import mentionsStyles from './mentionsStyles.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
//import './DraftStyleDefault.css'
import AuthUtils from '../../auth/AuthUtils.js';
//import 'draft-js/dist/Draft.css';

const Entry = (props) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;
  return (
    <div {...parentProps}>

        <div className={theme.mentionSuggestionsEntryContainer+ " row"}>
          <div className={theme.mentionSuggestionsEntryContainerLeft+" col-sm-2"}>
            <img
              src={mention.get('avatar')}
              className={theme.mentionSuggestionsEntryAvatar}
              role="presentation"
            />
          </div>

          <div className={theme.mentionSuggestionsEntryContainerRight+" col-sm-10"}>
            <div className={theme.mentionSuggestionsEntryText}>
              <a href={Config.api.ROOT_URL+"/user/show/"+mention.get('id')}>{mention.get('name')}</a>
            </div>
          </div>
        </div>



    </div>
  );
};

    function findLinkEntities(contentBlock, callback, contentState) {

            contentBlock.findEntityRanges(
              (character) => {
                const entityKey = character.getEntity();
                return (
                  entityKey !== null &&
                  contentState.getEntity(entityKey).getType() === 'LINK'
                );
              },
              callback
            );
          }

    const Link = (props) => {
           const {url} = props.contentState.getEntity(props.entityKey).getData();
           return (
             <a href={url} style={styles.link} >
               {props.children}
             </a>
           );
         };

  function findImageEntities(contentBlock, callback, contentState) {
           contentBlock.findEntityRanges(
             (character) => {
               const entityKey = character.getEntity();
               return (
                 entityKey !== null &&
                 contentState.getEntity(entityKey).getType() === 'IMAGE'
               );
             },
             callback
           );
         }

  const Image = (props) => {
           const {
             height,
             src,
             width,
           } = props.contentState.getEntity(props.entityKey).getData();
           return (
             <img src={src} height={height} width={width} />
           );
         };

      const styles = {

              };
class RichTextEditor extends React.Component {
  // decorator = [
  //       {
  //       strategy: findLinkEntities,
  //       component: Link,
  //       }
  //       ,
  //       {
  //          strategy: findImageEntities,
  //          component: Image,
  //       }
  //     ]
  constructor(props) {
    super(props);

    this.decorator = [
          {
          strategy: findLinkEntities,
          component: Link,
          }
          ,
          {
             strategy: findImageEntities,
             component: Image,
          }
        ]
    this.mentionPlugin = createMentionPlugin();
    this.hashtagPlugin = createHashtagPlugin();
    this.imagePlugin = createImagePlugin();
    this.linkifyPlugin = createLinkifyPlugin();
    this.blocksFromHTML='';
    this.stat='';
    if(this.props.htm){
      this.blocksFromHTML = convertFromHTML(this.props.htm)
      this.stat = ContentState.createFromBlockArray(
                                        this.blocksFromHTML.contentBlocks,
                                        this.blocksFromHTML.entityMap
                                    );
      console.log("statatatatatatatatattatta",this.stat)
    }
    this.state = {
      editorState: (this.props.htm?EditorState.createWithContent(this.stat,new CompositeDecorator(this.decorator)):EditorState.createEmpty()),
      suggestions:[],
      key:this.props.obvId,
      login_modal:false,
      options:'',
      loading:false
    };
    this.taggedUsers=[];
    this.onChange =  this.onChange.bind(this);
    this.onSearchChange =  this.onSearchChange.bind(this);
    this.focus = this.focus.bind(this);
  }

  onChange  (editorState) {
    this.setState({
      editorState,
    });
  };

  onSearchChange ({ value }) {
    document.body.style.cursor = "wait";
    axios.get(Config.api.ROOT_URL+"/user/terms?term="+value+"&format=json")
        .then((response)=>{
          document.body.style.cursor = "default";
          let data1= response.data.map((user,index)=>{
              let data={}
             data.id=JSON.stringify(user.userId)
             data.name=user.value
             data.link=this.props.PublicUrl+"/user/show/"+JSON.stringify(user.userId);
             data.avatar=user.user_pic
             return data
           })
          this.setState({
            suggestions:  data1,
          });
        })
  };

  focus  () {
    this.editor.focus();
  };



  onCommentPost(e){
    document.body.style.cursor = "wait";
    this.setState({
      loading:true
    })
    e.preventDefault();
    console.log("parentCommentID",this.props.parentCommentId)
    var id1=this.props.chId;
    var id2=this.props.obvId;
    var raw=convertToRaw(this.state.editorState.getCurrentContent());
    console.log("rawhtmldkjgerjg",raw)
    var blocks = raw.blocks;
    var entityMap = raw.entityMap
    var entityRanges = blocks[0].entityRanges;
    var text = blocks[0].text;
    var i;
    var f;
    var x;
    if(entityRanges.length>0){
      for(i=0;i<entityRanges.length;i++){
        var toBeReplaced = text.slice(entityRanges[i].offset,entityRanges[i].offset+entityRanges[i].length)
        if(i===0){
          var n = text.slice(0,entityRanges[i].offset+entityRanges[i].length)
          f=n;
          x=n;
        }else{
          var n = text.slice(entityRanges[i-1].offset+entityRanges[i-1].length,entityRanges[i].offset+entityRanges[i].length)
          f=f+n;
          x=x+n;
        }
        if(entityMap[i].type === "LINK"){
          var toBeReplacedWith = "<a href="+entityMap[i].data.href+">"+toBeReplaced+"</a>"
          f= f.replace(toBeReplaced,toBeReplacedWith);
          this.taggedUsers.push(entityMap[i].data.rel)
        }else if(entityMap[i].type === "mention"){
          var toBeReplacedWith = "<a href="+entityMap[i].data.mention._root.entries[2][1]+">"+toBeReplaced+"</a>"
          f= f.replace(toBeReplaced,toBeReplacedWith);
          this.taggedUsers.push(entityMap[i].data.mention._root.entries[0][1])
        }

      }

      if(x.length<text.length){
        var a = text.slice(entityRanges[i-1].offset+entityRanges[i-1].length)
        f=f+a;
      }
    }

    console.log("finaltextinhtml",f)
    var value1;
    if(entityRanges.length>0){
      value1 = f;
      console.log("if greater than 0",value1)
    }else{
      value1 = text;
      console.log("if less than 0",value1)
    }

    var d = new Date();
    var tym = d.getTime();
    var options;
    //console.log("*******************************************************************",this.props.parentCommentId)
    var commentHolderType = (id1===id2)?("species.participation.Observation"):("species.participation.Recommendation");
    var rootHolderType = "species.participation.Observation"

    if(this.props.parentCommentId){
      console.log("tobepostedasreply",value1)
      if(this.taggedUsers.length === 0){
        options={
          method:'POST',
          url :    Config.api.API_ROOT_URL+"/comment/addComment",
          params:{
            commentBody:value1,
            commentHolderId:id1,
            commentHolderType:commentHolderType,
            rootHolderId:id2,
            rootHolderType:rootHolderType,
            parentId:this.props.parentCommentId,
            commentPostUrl:"/comment/addComment",
            userLanguage:"en",
            newerTimeRef:tym
          },
          headers : AuthUtils.getAuthHeaders(),
          json: 'true'
        }
      }else{
        options={
          method:'POST',
          url :    Config.api.API_ROOT_URL+"/comment/addComment",
          params:{
            commentBody:value1,
            commentHolderId:id1,
            commentHolderType:commentHolderType,
            rootHolderId:id2,
            rootHolderType:rootHolderType,
            parentId:this.props.parentCommentId,
            commentPostUrl:"/comment/addComment",
            userLanguage:"en",
            tagUserId:this.taggedUsers.toString(),
            newerTimeRef:tym
          },
          headers : AuthUtils.getAuthHeaders(),
          json: 'true'
        }
      }

    }else if(this.props.currentCommentId){
      console.log("tobeposted",value1)
        if(this.taggedUsers.length === 0){
          options={
            method:'POST',
            url :    Config.api.API_ROOT_URL+"/comment/addComment",
            params:{
              commentBody:value1,
              commentHolderId:id1,
              commentHolderType:commentHolderType,
              rootHolderId:id2,
              rootHolderType:rootHolderType,
              commentId:this.props.currentCommentId,
              commentPostUrl:"/comment/addComment",
              userLanguage:"en",
              newerTimeRef:tym
            },
            headers : AuthUtils.getAuthHeaders(),
            json: 'true'
          }
        }else{
          options={
            method:'POST',
            url :    Config.api.API_ROOT_URL+"/comment/addComment",
            params:{
              commentBody:value1,
              commentHolderId:id1,
              commentHolderType:commentHolderType,
              rootHolderId:id2,
              rootHolderType:rootHolderType,
              commentId:this.props.currentCommentId,
              commentPostUrl:"/comment/addComment",
              userLanguage:"en",
              tagUserId:this.taggedUsers.toString(),
              newerTimeRef:tym
            },
            headers : AuthUtils.getAuthHeaders(),
            json: 'true'
          }
        }

    }else{
      if(this.taggedUsers.length === 0){
        console.log("tobeposted",value1)
        options={
          method:'POST',
          url :    Config.api.API_ROOT_URL+"/comment/addComment",
          params:{
            commentBody:value1,
            commentHolderId:id1,
            commentHolderType:commentHolderType,
            rootHolderId:id2,
            rootHolderType:rootHolderType,
            commentPostUrl:"/comment/addComment",
            userLanguage:"en",
            newerTimeRef:tym
          },
          headers : AuthUtils.getAuthHeaders(),
          json: 'true'
        }
      }else{
        options={
          method:'POST',
          url :   Config.api.API_ROOT_URL+"/comment/addComment",
          params:{
            commentBody:value1,
            commentHolderId:id1,
            commentHolderType:commentHolderType,
            rootHolderId:id2,
            rootHolderType:rootHolderType,
            commentPostUrl:"/comment/addComment",
            userLanguage:"en",
            tagUserId:this.taggedUsers.toString(),
            newerTimeRef:tym
          },
          headers : AuthUtils.getAuthHeaders(),
          json: 'true'
        }
      }

    }

    if(value1!=="")
    {
    this.setState({
        editorState: EditorState.createEmpty(),
      })
      this.taggedUsers=[];
    axios(options)
        .then((response)=>{
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6")
          //console.log(this.props.fetchFeeds)
          document.body.style.cursor = "default";
          this.setState({
            loading:false
          })
          if(response.status === 200){
            if(this.props.getFeeds){
              this.props.getFeeds(this.props.obvId,true);
            }
            if(this.props.getRecoComment){
              if(this.props.incrementCount){
                this.props.incrementCount();
                this.props.getRecoComment(true,false);
              }else{
                this.props.getRecoComment(true,false);
              }
            }
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
           console.log(error.response.statusText)
         }
         })
      }
  }

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin,this.imagePlugin,this.linkifyPlugin,this.hashtagPlugin];
    //console.log("console of different key&&&&&&&&&&&&&&&&&&&&&&&&&7",this.props.id)

    return (
      <div className="row" >
        {this.state.login_modal===true?(<ModalPopup key={this.state.options} options={this.state.options} id={this.props.obvId} funcRefresh={this.props.getFeeds} type={"Reply/Add Comment"}/>):null}
        <div className="col-sm-11" >
        <div className="editor" style={{marginTop:'0%',minHeight:'22px'}} onClick={this.focus} >
        <Editor
          decorators={this.decorator}
          key={this.state.key}
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          entryComponent={Entry}
        />
        </div>
        </div>
        <div className="col-sm-1" >
          <input type="submit" value="Post" className="btn btn-xs btn-primary comment-post-btn " style={{float:'right'}} onClick={this.onCommentPost.bind(this)} disabled={this.state.loading}/>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state){
// return {
//   PublicUrl:state.PublicUrl.url
// };
//
// export default  withRouter(connect(mapStateToProps)(RichTextEditor));
export default RichTextEditor;
