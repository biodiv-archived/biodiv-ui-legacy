import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import Img from 'react-image';

export default class LightboxExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }

    render() {
      const images = this.props.imageArray;
        const {
            photoIndex,
            isOpen,
        } = this.state;

        return (
            <div>
              <a href={"http://indiabiodiversity.org/observation/show/"+this.props.objid+"?pos="+this.props.pos}>
              <div id="mycarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">
                    <Img src={this.props.thumbnail}
                    className="media-object img-responsive"/>
                    <div className="carousel-caption ">
                         <strong onClick={() => this.setState({ isOpen: true })}>View Gallery {this.props.noofimages}  <i className="fa fa-picture-o" aria-hidden="true"></i></strong>
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
              </a>
        {/*   <Img src={this.props.thumbnail}    onClick={() => this.setState({ isOpen: true })}
               className="media-object img-responsive " />
               */}

            </div>
        );
    }
}
