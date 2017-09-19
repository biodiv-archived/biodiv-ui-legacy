import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import SignIn from './signin.js'
import axios from 'axios';

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
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

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

   var newOptions=this.props.options
   console.log(this.props.options.headers['X-Auth-Token'])
   newOptions.headers['X-Auth-Token']=localStorage.getItem('token')
    axios(newOptions)
    .then((response)=>{
      console.log("comment",response)
      this.props.sGroup?
      (
        this.props.funcRefresh?this.props.funcRefresh(this.props.id,this.props.sGroup):null
      ):
      (
      this.props.funcRefresh?(this.props.id1?this.props.funcRefresh(this.props.id1,this.props.id):this.props.funcRefresh(this.props.id)):null
      )
    })
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
          <SignIn closeModal={this.closeModal}/>
        </Modal>
      </div>
    );
  }
}


export default ModalPopup;
