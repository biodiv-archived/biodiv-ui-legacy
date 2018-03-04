import React from 'react';
import { Form, Text, Radio, Select, Checkbox } from 'react-form';

import Modal from 'react-modal';

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

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Export As"
        >
          <h2>Export As</h2>
          <div className="container">
<form>
  <div className="radio">
    <label><input type="radio" name="csv" />CSV</label>
  </div>
  <div className="radio">
    <label><input type="radio" name="kml" />KML</label>
  </div>
  <div className="radio">
    <label><input type="radio" name="DWCA" />DWCA</label>
  </div>
  <textarea  width="200px"></textarea>
  <br />
  <button className="btn btn-warning">Cancel</button>
  <button className="btn btn-primary">Submit</button>

</form>
</div>

        </Modal>
      </div>
    );
  }
}
export default DownloadModal;
