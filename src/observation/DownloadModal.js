import React from 'react';
import { Form, Text, TextArea, Checkbox} from 'react-form';
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
      modalIsOpen: true,
      notes:undefined,
      authorize:false,
      authorizeText:"not",
      notesText:"not"
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }




  closeModal(event) {
    this.setState({modalIsOpen: false});
    event.preventDefault();
  }


  handleSubmit(submittedValues){
    if(submittedValues.notes && submittedValues.authorize){
          this.setState({
            notes:submittedValues.notes,
            authorize:submittedValues.authorize
          })
          let url = Config.api.API_ROOT_URL+"/naksha/download" + this.props.Url.countUrl + "&notes="+submittedValues.notes;
            axios.get(url).then((response)=>{
              alert("Your downlaod status is "+ response.data +". You will be notified by email and a download link will be available on your profile page. ");
                this.setState({modalIsOpen: false});
            }).catch((response)=>{
              alert("error! Please try again.")
            })
      }
      else{
        let notesText=this.state.notesText;
        let authorizeText=this.state.authorizeText;
        if(!submittedValues.notes){
            notesText="visible";
        }
        else{
          notesText="not";
        }
        if(!submittedValues.authorize){
          authorizeText="visible";
        }
        else{
          authorizeText="not";
        }
        this.setState({
          notesText,
          authorizeText
        })
      }
    }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Export"
        >
        <span style={{color:'#008CBA'}} >Export as CSV</span>

          <Form onSubmit={this.handleSubmit.bind(this)} >
           { formApi => (
             <form onSubmit={formApi.submitForm} id="form">
               <div className="form-group" style={{marginBottom:'10px',marginTop:'10px'}}>
               <TextArea placeholder="Please let us know how you intend to use this data."  field="notes" id="notes"  className="form-control"  />

               <span style={{color:'red',fontSize:'10px',marginTop:'5px'}}>{this.state.notesText=="not"?null:(this.state.notesText=="visible"?"* Notes is necessary":null)}</span>
               <br />
               <Checkbox field="authorize" id="authorize"   />
                {" "}  By submitting this form, you agree that Creative Commons - Attribution (CC-BY) terms will apply to all data provided and that you agree to provide attribution to the original data contributors and the portal where applicable.
                <br />
                <span style={{color:'red',fontSize:'10px',marginTop:'5px'}} >{this.state.authorizeText=="not"?null:(this.state.authorizeText=="visible"?"* Please accept the terms and conditions.":null)}</span>
               </div>
               <button type="submit" className="mb-4 btn btn-primary pull-right"  >Submit </button>
               <button onClick={this.closeModal} className="mb-4 btn btn-warning pull-right">Cancel</button>
             </form>
           )}
         </Form>
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
