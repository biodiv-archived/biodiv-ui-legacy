import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import {Link} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
export default class LightboxExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }

callShowPage(objs){
  const history = createHistory();
    console.log("history",history);
  history.push(`/show/${this.props.objid}`, { some:objs  })
}
    render() {
      const images = this.props.imageArray;
        const {
            photoIndex,
            isOpen,
        } = this.state;

        return (
            <div>

              <div id="mycarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">
                    <img src={this.props.thumbnail}
                    className="media-object img-responsive" onClick={this.callShowPage.bind(this,this.props.objs)} />
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

            </div>
        );
    }
}
