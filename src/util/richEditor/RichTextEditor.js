import React, { Component } from 'react';
import axios from 'axios'
import { Config } from '../../Config';
import { CompositeDecorator,
        ContentBlock,
        ContentState,
        EditorState,
        convertFromHTML,convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import 'draft-js-mention-plugin/lib/plugin.css';
import createMentionPlugin,{ defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import editorStyles from './editorStyles.css';
//import mentionsStyles from './mentionsStyles.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
//import './DraftStyleDefault.css'
import AuthUtils from '../../auth/AuthUtils.js';
import 'draft-js/dist/Draft.css';

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
                root: {
                  fontFamily: '\'Helvetica\', sans-serif',
                  padding: 20,
                  width: 600,
                },
                editor: {
                  border: '1px solid #ccc',
                  cursor: 'text',
                  minHeight: 80,
                  padding: 10,
                },
                button: {
                  marginTop: 10,
                  textAlign: 'center',
                },
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
    this.decorator = new CompositeDecorator([
            {
              strategy: this.findLinkEntities,
              component: this.Link,
            },
            {
              strategy: this.findImageEntities,
              component: this.Image,
            },
          ]);


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
      key:this.props.id
    };
  }

  onChange (editorState) {
    // this.setState({
    //   editorState,
    // });
  };

  onSearchChange ({ value }) {
    // axios.get(Config.api.ROOT_URL+"/user/terms?term="+value+"&format=json")
    //     .then((response)=>{
    //       let data1= response.data.map((user,index)=>{
    //           let data={}
    //          data.id=JSON.stringify(user.userId)
    //          data.name=user.value
    //          data.link=Config.api.ROOT_URL+"/user/show/"+JSON.stringify(user.userId);
    //          data.avatar=user.user_pic
    //          return data
    //        })
    //       this.setState({
    //         suggestions:  data1,
    //       });
    //     })
  };

  focus () {
    // this.editor.focus();
  };

  onCommentPost(e){
    e.preventDefault();
    var id1=this.props.id;
    var raw=convertToRaw(this.state.editorState.getCurrentContent());
    console.log("rawhtmldkjgerjg",raw)
    var blocks = raw.blocks;
    var entityMap = raw.entityMap
    var entityRanges = blocks[0].entityRanges;
    var text = blocks[0].text;
    var i;
    var f;
    var x;
    for(i=0;i<entityRanges.length;i++){
      var toBeReplaced = text.slice(entityRanges[i].offset,entityRanges[i].offset+entityRanges[i].length)
      if(i==0){
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
      }else if(entityMap[i].type === "mention"){
        var toBeReplacedWith = "<a href="+entityMap[i].data.mention._root.entries[2][1]+">"+toBeReplaced+"</a>"
        f= f.replace(toBeReplaced,toBeReplacedWith);
      }

    }
    if(x.length<text.length){
      var a = text.slice(entityRanges[i-1].offset+entityRanges[i-1].length)
      f=f+a;
    }
    console.log("finaltextinhtml",f)
    var value1 = f;
    var d = new Date();
    var tym = d.getTime();
    var options={
      method:'POST',
      url :   Config.API_ROOT_URL+"/comment/addComment?commentHolderId="+id1+"&commentHolderType=species.participation.Observation&rootHolderId="+id1+"&rootHolderType=species.participation.Observation&commentBody="+value1+"&newerTimeRef="+tym,
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

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin,this.imagePlugin,this.linkifyPlugin,this.hashtagPlugin];
    console.log("console of different key&&&&&&&&&&&&&&&&&&&&&&&&&7",this.props.id)

    return (
      <div className="row">
        <div className="col-sm-9" style={{marginLeft:'2%',width:'85%'}}>
        <div className={editorStyles.editor} style={{marginTop:'0%'}} onClick={this.focus}>
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
        <div className="col-sm-1 pull-right" style={{marginRight:'2%'}}>
          <input type="submit" value="Post" className="btn btn-xs comment-post-btn " style={{float:'right'}} onClick={this.onCommentPost.bind(this)}/>
        </div>
      </div>
    );
  }
}



export default RichTextEditor;
