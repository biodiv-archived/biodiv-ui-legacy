import React from 'react';
import { Form, Text, Radio, Select, Checkbox } from 'react-form';
import axios from 'axios';
import Modal from 'react-modal';
import {NavLink,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {Config} from '../Config'
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

class DownloadModal extends React.Component {
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
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  getDownloads(){
    let url = Config.api.API_ROOT_URL+"/naksha/download" + this.props.Url.countUrl + "&notes="+this.refs.notes.value;
      axios.get(url).then((response)=>{
        alert("Your downlaod "+ response.data);
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
          contentLabel="Export"
        >
          <div className="container">
            <h3 >Export as CSV</h3>

            <textarea ref={"notes"} style={{width:'100%',border:'1px solid grey'}} placeholder="Please let us know how you intend to use this data"></textarea>
            <br />
            <button onClick={this.getDownloads.bind(this)} className="btn btn-primary pull-right">Submit</button> {"        "}
            <button onClick={this.closeModal} className="btn btn-warning pull-right">Cancel</button>
        </div>

        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state,ownProps) {
  return {
    Url:state.FilterCount
  }
}
export default withRouter(connect(mapStateToProps,null)(DownloadModal ));
