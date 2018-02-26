import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {Config} from '../../Config';
import createHistory from 'history/createBrowserHistory';
import style from './style.css'
export default class LightboxExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: false,
            resource:[]
        };
    }
    getUrl(thumbnail){
      let res = thumbnail?thumbnail.split("."):null;
      if(res)
      return `http://indiabiodiversity.org/biodiv/observations/`+res[0]+"_th1.jpg"
      else {
        return null
      }
    }
    render() {
      let images=[];
      this.props.images?this.props.images.map((data)=>{
        data="http://indiabiodiversity.org/biodiv/observations/"+data;
         images.push(data);
      }):null;
      const {photoIndex,isOpen} = this.state;
        return (
            <div>

              <div id="mycarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">
                        <NavLink to={`show/${this.props.objs.id}`} >
                    <img src={this.getUrl(this.props.thumbnail)} style={{height:'200px',width:'200px'}} className="media-object img-responsive img-rounded" />
                     </NavLink>
                    <div className="carousel-caption" >
                         <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofimages}  <i className="fa fa-picture-o" aria-hidden="true"></i></strong>
                         {"           "}
                         <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofaudio}  <i className="fa fa-file-audio-o" aria-hidden="true"></i></strong>
                         {"        "}
                         <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofvideos}  <i className="fa fa-video-camera" aria-hidden="true"></i></strong>
                    </div>
                    {isOpen &&
                        <Lightbox
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
