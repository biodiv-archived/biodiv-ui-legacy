import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import LogIn from './Login.js'
import axios from 'axios';
import AuthUtils from './AuthUtils.js';
import {connect} from 'react-redux';
import * as AuthConstants from  './AuthConstants';
import loginService from './LoginService';
import './Modal.css'

import { getNewAccessToken } from './AuthActions';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ModalPopup extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };


        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount() {
        var brToken = loginService.getRefreshToken();
        var now = new Date().getTime();
        var timeLeftForRToken = loginService.getLastLoginDate().getTime() + (30*24*60*60*1000) - now;//issued at+30 days - now

        //if only 5 days are left to get new refresh token we will
        //propmt the user to login again to progress his login window by another 30 days
        if(brToken == null || timeLeftForRToken <= (5*24*60*60*1000)) {
            this.openModal();
        } else {
            //get new accessToken with existing refreshtoken
            return getNewAccessToken().then(data => {
                this.props.dispatch(data);
                if(data.type == AuthConstants.AUTH_USER) {
                    this.closeModal();
                } else {
                    this.openModal();
                }
            });
        }
    }

    openModal() {
        console.log("openmodal")
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    closeModal() {
        this.setState({modalIsOpen: false});

        if(this.props.options) {
            var newOptions=this.props.options;
            newOptions.headers=AuthUtils.getAuthHeaders()
                axios(newOptions)
                .then((response)=>{
                    console.log("comment",response)
                    if(this.props.type){
                        if(this.props.type == "Reply/Add Comment"){
                            this.props.funcRefresh(this.props.id,true)
                        }
                        if(this.props.type=='joinus'){
                          this.props.funcjoinus();
                        }
                        if(this.props.type==='obvFlags'){
                          this.props.funcRefresh();
                        }
                    }else{
                        if(this.props.sGroup){
                            if(this.props.funcRefresh){this.props.funcRefresh(this.props.id,this.props.sGroup)}
                        }else{
                            if(this.props.funcRefresh){
                                this.props.id1?this.props.funcRefresh(this.props.id1,this.props.id):this.props.funcRefresh(this.props.id)
                            }
                        }
                    }

                })
                .catch((error)=>{
                    console.log(error);
                    alert(error.message);
                });
        }
        else{
            if(this.props.func){this.props.func()}
        }
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <LogIn closeModal={this.closeModal}/>
                </Modal>
            </div>
        );
    }
}


function mapStateToProps(store) {
    return {
        dispatch:store.dispatch,
        authenticated: store.auth.authenticated
    };
}


export default connect(mapStateToProps, null)(ModalPopup);
