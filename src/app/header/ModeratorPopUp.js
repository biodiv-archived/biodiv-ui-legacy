import React from 'react';
import { Form, Text, TextArea, Checkbox} from 'react-form';
import axios from 'axios';
import Modal from 'react-modal';
import {NavLink,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import {Config} from '../../Config'

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
      notesText:"not"
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }




  closeModal(event) {
    this.setState({modalIsOpen:!this.state.modalIsOpen});
    event.preventDefault();
  }


  handleSubmit(submittedValues){
    console.log("aaye");
    if(submittedValues.notes ){
          this.setState({
            notes:submittedValues.notes
          })

          let url = Config.api.ROOT_URL+"/"+this.props.PublicUrl+"userGroup/requestModeratorship?message="+submittedValues.notes;
            axios.post(url).then((response)=>{
              alert(response.msg);
                this.setState({modalIsOpen: false});
            }).catch((response)=>{
              alert("error! Please try again.")
            })
      }
      else{
        let notesText=this.state.notesText;

        if(!submittedValues.notes){
            notesText="visible";
        }
        else{
          notesText="not";
        }

        this.setState({
          notesText
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
        <span style={{color:'#008CBA'}} >Become moderator</span>

          <Form onSubmit={this.handleSubmit.bind(this)} >
           { formApi => (
             <form onSubmit={formApi.submitForm} id="form">
               <div className="form-group" style={{marginBottom:'10px',marginTop:'10px'}}>
               <TextArea placeholder="Please mention why you will be a suitable moderator for this group."  field="notes" id="notes"  className="form-control"  />

               <span style={{color:'red',fontSize:'10px',marginTop:'5px'}}>{this.state.notesText=="not"?null:(this.state.notesText=="visible"?"* Notes is necessary":null)}</span>
               <p>
              As moderator, you can be involved with featuring observations, documents and species pages within a group. You will have rights to add or remove resources in bulk, receive mails for all activity, and invite other moderators to the group.

               </p>
               </div>
               <button  type="submit" className="mb-4 btn btn-primary pull-right"  >Submit </button>
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
    Url:state.FilterCount,
    PublicUrl:state.PublicUrl.url,
  }
}
export default withRouter(connect(mapStateToProps,null)(DownloadModal ));
