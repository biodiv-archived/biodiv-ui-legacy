import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import styles from './style.css';
import {ClearObservationPage} from '../../../actions/index';
const styles1 = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};
class SpeciesGroup extends Component {
  constructor(props) {

    super(props);
    this.state = {
      active: false,
      checked: false,
       sGroupId: [],
      queryParams: "",
      title:[]
    }
  }

  setParameter() {

    const newparams = queryString.parse(document.location.search);
    if (newparams.sGroup) {
      const data = newparams.sGroup.split(",");
      this.setState({
        sGroupId:data
      })

    }
  }
  componentDidMount() {
    this.setParameter();
  }


  sChanged = (sGroupId,event) => {
      this.setState({
        sGroupId
      },()=>{
        var event = new CustomEvent("sGroup-filter", {
          "detail": {
            sGroup: this.state.sGroupId,
          }
        });
        document.dispatchEvent(event);
      });

      event.persist();
    }
  render() {
    return (
       < div >
       <CheckboxGroup
         name="groups"
         value={this.state.sGroupId}
         onChange={this.sChanged.bind(this)}>
         <label><Checkbox value="841"/> Mammals</label>
         <br/>
         <label><Checkbox value="837"/> Birds</label>
         <br/>
         <label><Checkbox value="845"/> Fish</label>
         <br/>
         <label><Checkbox value="835"/> Amphibians</label>
         <br/>
         <label><Checkbox value="843"/> Reptiles</label>
         <br/>
         <label><Checkbox value="856"/> Molluscs</label>
         <br/>
         <label><Checkbox value="839"/> Arthropods</label>
         <br/>
         <label><Checkbox value="833"/> Plants</label>
         <br/>
         <label><Checkbox value="831"/> Fungi</label>
         <br/>
         <label><Checkbox value="830"/> Others</label>
       </CheckboxGroup>
      </div >)
  }
}

export default SpeciesGroup;
