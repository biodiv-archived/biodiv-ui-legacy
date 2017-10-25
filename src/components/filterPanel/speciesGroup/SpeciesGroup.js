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
      let title=[];
      data.map((item)=>{
        if(item=="841"){
          title.push("Mammals");
        }
        if(item=="837"){
          title.push("Birds")
        }
        if(item=="845"){
          title.push("Fish")
        }
        if(item=="835"){
          title.push("Amphibians")

        }
        if(item=="843"){
          title.push("Reptiles")

        }
        if(item=="856"){
          title.push("Molluscs")

        }
        if(item=="839"){
          title.push("Arthropods")

        }
        if(item=="833"){
          title.push("Plants")

        }
        if(item=="831"){
          title.push("Fungi")

        }
        if(item=="830"){
          title.push("Others")

        }
      })

      this.setState({sGroupId:data},()=>{
        var event = new CustomEvent("sGroup-filter", {
          "detail": {
            groupName:title
          }
        });
        document.dispatchEvent(event);

      })

    }
  }
  componentDidMount() {
    this.setParameter();
  }


  sChanged = (sGroupId,event) => {
    console.log(sGroupId,event)
    let title=[]
      this.setState({
        sGroupId
      },()=>{
        this.state.sGroupId.map((item)=>{
          if(item=="841"){
            title.push("Mammals");
          }
          if(item=="837"){
            title.push("Birds")
          }
          if(item=="845"){
            title.push("Fish")
          }
          if(item=="835"){
            title.push("Amphibians")

          }
          if(item=="843"){
            title.push("Reptiles")

          }
          if(item=="856"){
            title.push("Molluscs")

          }
          if(item=="839"){
            title.push("Arthropods")

          }
          if(item=="833"){
            title.push("Plants")

          }
          if(item=="831"){
            title.push("Fungi")

          }
          if(item=="830"){
            title.push("Others")

          }
        })
        console.log("this",this.state.sGroupId,title)
        var event = new CustomEvent("sGroup-filter", {
          "detail": {
            sGroup: this.state.sGroupId,
            groupName:title
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
