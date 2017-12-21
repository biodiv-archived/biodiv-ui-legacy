import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import axios from 'axios';
import styles from './style.css';
import 'rc-checkbox/assets/index.css';

import {ClearObservationPage} from '../../../actions/index';
import {Config}  from '../../../Config';

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
      sGroupId: [],
      queryParams: "",
      title:[],
      list:[]
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
  getData(){
    axios.get(`${Config.api.API_ROOT_URL}/species/list`).then((response)=>{
      this.setState({
        list:response.data
      })
    })
  }
  componentDidMount() {
    this.setParameter();
    this.getData();
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
       <CheckboxGroup
         name="groups"
         value={this.state.sGroupId}
         onChange={this.sChanged.bind(this)}>
         {this.state.list.map((item,index)=>{
           return(
             <div key={index}>
             <label><Checkbox value={item.id.toString()} />{item.name}</label>
             </div>
           )
         })}
       </CheckboxGroup>
    )
  }
}
export default SpeciesGroup;
