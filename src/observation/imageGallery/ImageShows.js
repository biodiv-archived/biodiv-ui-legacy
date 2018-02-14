import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {Config} from '../../Config';
import createHistory from 'history/createBrowserHistory'
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
      var res = thumbnail?thumbnail.split("."):null;
      if(res)
      return `/biodiv/observations/`+res[0]+"_th1."+res[1];
      else {
        return null
      }
    }
    render() {
      let images=[];
      this.props.images?this.props.images.map((data)=>{
         images.push(this.getUrl(data));
      }):null;
      const {photoIndex,isOpen} = this.state;

        return (
            <div>

              <div id="mycarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">
                        <NavLink to={`show/${this.props.objs.id}`} >
                    <img src={this.getUrl(this.props.thumbnail)} className="media-object img-responsive img-rounded" />
                     </NavLink>
                    <div className="carousel-caption ">
                         <strong onClick={() => this.setState({ isOpen: true })}>View Gallery {this.props.objs.noofimages}  <i className="fa fa-picture-o" aria-hidden="true"></i></strong>
                         <strong onClick={() => this.setState({ isOpen: true })}>View Audio {this.props.objs.noofaudio}  <i className="fa fa-picture-o" aria-hidden="true"></i></strong>
                         <strong onClick={() => this.setState({ isOpen: true })}>View Video {this.props.objs.noofvideos}  <i className="fa fa-picture-o" aria-hidden="true"></i></strong>

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
