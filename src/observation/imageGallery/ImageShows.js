import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {Config} from '../../Config';
import createHistory from 'history/createBrowserHistory';
import style from './style.css';
import UserAvatar from '../../util/userIcon';
import isAbsoluteUrl  from 'is-absolute-url';


export default class LightboxExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: false,
            resource:[]
        };
    }

    getUserPhotoUrl(images){
        if(images){
          if(isAbsoluteUrl(images)){
            return images;
          }
          else{
            let url=`${Config.api.IBP_URL}/biodiv/users${images}`;
            return url;
          }
        }
        else{
          return null;
        }
    }
    getUrl(thumbnail,speciesGroup){

      let group=speciesGroup.toLowerCase();
      let groupIcon=null;
      groupIcon=Config.api.IBP_URL+'/biodiv/group_icons/speciesGroups/'+group+'_th2.png';

      let res = thumbnail?thumbnail.split("."):null;

      if(res){
        if(res[1]=="mp3" || res[1]=="wav"){
            return Config.api.IBP_URL+'/biodiv/assets/all/audioicon.png';
          }
          else if(res[0]=="v"){
            let url = this.props.videos[0];
            let videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            if(videoid != null) {
              let imageUrl="https://img.youtube.com/vi/"+videoid[1]+"/0.jpg";
              return imageUrl
            }
          }
          else{
            return `${Config.api.IBP_URL}/biodiv/observations/`+res[0]+"_th2.jpg"
          }
        }
      else {
        return groupIcon
      }
    }
    render() {
      let images=[];
      this.props.images?this.props.images.map((data)=>{
        if(data=='v'){
        }
        else if(data.split(".")[1]==="mp3" || data.split(".")[1]==="wav" ){
          images.push(Config.api.IBP_URL+"/biodiv/assets/all/audioicon.png")
        }
        else{
          data=Config.api.IBP_URL+"/biodiv/observations/"+data;
           images.push(data);
        }

      }):null;
      this.props.videos?this.props.videos.map((data)=>{
          let url = data;
          let videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
          if(videoid != null) {
            let imageUrl="https://img.youtube.com/vi/"+videoid[1]+"/0.jpg";
            images.push(imageUrl);

          }
      }):null;
      const {photoIndex,isOpen} = this.state;
        return (
            <div>
              <div id="mycarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">
                        <a href={`show/${this.props.objs.id}`} >
                          <figure className="snip1336">
                            <img className="small-size-pic" id="thumbnail" src={this.getUrl(this.props.thumbnail,this.props.speciesgroupname)}  />

                          </figure>

                        </a>
                        <div className="carousel-caption" >
                             <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofimages}  <i className="fa fa-picture-o" aria-hidden="true"></i></strong>
                             {"           "}
                             <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofaudio}  <i className="fa fa-file-audio-o" aria-hidden="true"></i></strong>
                             {"        "}
                             <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofvideos}  <i className="fa fa-video-camera" aria-hidden="true"></i></strong>
                        </div>

                    {isOpen &&
                        <Lightbox
                            style={{marginTop:'50%'}}
                            clickOutsideToClose={true}
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}

                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() => this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })}
                            onMoveNextRequest={() => this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })}

                        />
                    }
                  </div>
                </div>
              </div>

            </div>
        );
    }
}
