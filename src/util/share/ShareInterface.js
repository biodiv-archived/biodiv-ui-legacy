import React, { Component } from 'react';
import axios from 'axios'
import { Config } from '../../Config';
import {NavLink,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AuthUtils from '../../auth/AuthUtils.js';
import ModalPopup from '../../auth/Modal.js';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  RedditShareButton,
  TwitterShareButton,
  PinterestShareButton,
  EmailShareButton,

  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  RedditIcon,
  PinterestIcon,
  EmailIcon,
} from 'react-share';


class ShareInterface extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      olderFlags:[],
      loading:false,
      login_modal:false,
      options:''
    }
  }

  componentDidMount(){

  }

  render(){
    //console.log("share",this.props.obvId,this.props.obvImage)
    const shareUrl = Config.api.ROOT_URL+"/observation/show/"+this.props.obvId;
    const title = this.props.title;
    const media = Config.api.ROOT_URL+"/biodiv/observations/"+this.props.obvImage;
    return(
      <div className="container-fluid" style={{paddingTop:'10px',paddingBottom:'10px',paddingRight:'20px',paddingLeft:'20px'}}>
        <div className="row">
            <center><b>{this.props.LocaleData['title.share']}</b></center>
        </div>
        <div className="row" style={{marginTop:'5%'}}>
          <div className="col-xs-4">
              <FacebookShareButton
                url={shareUrl}
                quote={title}
                className="Demo__some-network__share-button">
                <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>
          </div>
          <div className="col-xs-4">
            <TwitterShareButton
              url={shareUrl}
              title={title}
              className="Demo__some-network__share-button">
              <TwitterIcon
                size={32}
                round />
            </TwitterShareButton>
          </div>
          <div className="col-xs-4">
            <GooglePlusShareButton
              url={shareUrl}
              className="Demo__some-network__share-button">
              <GooglePlusIcon
                size={32}
                round />
            </GooglePlusShareButton>
          </div>



        </div>
        <div className="row" style={{marginTop:'5%'}}>
          <div className="col-xs-4">
            <PinterestShareButton
              url={String(shareUrl)}
              media={media}
              windowWidth={1000}
              windowHeight={730}
              className="Demo__some-network__share-button">
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </div>
          <div className="col-xs-4">
             <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="Demo__some-network__share-button">
                <RedditIcon
                  size={32}
                  round />
              </RedditShareButton>
          </div>
          <div className="col-xs-4">
            <EmailShareButton
              url={shareUrl}
              subject={title}
              className="Demo__some-network__share-button">
              <EmailIcon
                size={32}
                round />
            </EmailShareButton>
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
return {
  PublicUrl:state.PublicUrl.url,
  LocaleData:state.LocaleData
};
}
export default  withRouter(connect(mapStateToProps,null)(ShareInterface));
