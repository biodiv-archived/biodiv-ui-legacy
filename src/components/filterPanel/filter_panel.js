import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ClearObservationPage} from '../../actions/index';
import styles from './style.css';
import queryString from 'query-string';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

const styles1 = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};
class FilterPanel extends Component {
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
  /*
  handleInput(value, groupName) {
    this.setState({active: true})
    var event = new CustomEvent("sGroup-filter", {
      "detail": {
        sGroup: value,
        groupName: groupName
      }
    });
    document.dispatchEvent(event);
  };
   */
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
       <CheckboxGroup className="Collapsible__contentInner"
         name="groups"
         value={this.state.sGroupId}
         onChange={this.sChanged.bind(this)}>
         <label><Checkbox value="841"/> Mammals</label>
         <label><Checkbox value="837"/> Birds</label>
         <label><Checkbox value="845"/> Fish</label>
         <label><Checkbox value="835"/> Amphibians</label>
         <label><Checkbox value="843"/> Reptiles</label>
         <label><Checkbox value="856"/> Molluscs</label>
         <label><Checkbox value="839"/> Arthropods</label>
         <label><Checkbox value="833"/> Plants</label>
         <label><Checkbox value="831"/> Fungi</label>
         <label><Checkbox value="830"/> Others</label>
       </CheckboxGroup>
{/*
       < div id = "speciesGroupFilter" data-toggle = "buttons-radio" > <table className="table">
      <tbody>
        <tr>
          <td>
            <button onClick={this.handleInput.bind(this, 829, "All")} className={`btn species_groups_sprites all_gall_th ${this.state.queryParams
              ? this.state.queryParams.includes("829")
                ? "active"
                : ""
              : null}`} id="group_829" value="829" title="All"></button>
          </td>
          <td>
            <button onClick={this.handleInput.bind(this, 841, "Mammals")} className={`btn species_groups_sprites mammals_gall_th ${this.state.queryParams
              ? this.state.queryParams.includes("841")
                ? "active"
                : ""
              : null}`} id="group_841" value="841" title="Mammals"></button>
          </td>
          <td>
            <button onClick={this.handleInput.bind(this, 837, "Birds")} className={`btn species_groups_sprites birds_gall_th ${this.state.queryParams
              ? this.state.queryParams.includes("837")
                ? "active"
                : ""
              : null}`} id="group_837" value="837" title="Birds"></button>
          </td>
          <td>
            <button onClick={this.handleInput.bind(this, 845, " Fish")} className={`btn species_groups_sprites fish_gall_th ${this.state.queryParams
              ? this.state.queryParams.includes("845")
                ? "active"
                : ""
              : null}`} id="group_845" value="845" title="Fish"></button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={this.handleInput.bind(this, 835, "Amphibians")} className={`btn species_groups_sprites amphibians_gall_th ${this.state.queryParams
              ? this.state.queryParams.includes("835")
                ? "active"
                : ""
              : null}`} id="group_835" value="835" title="Amphibians"></button>
          </td>
          <td>
            <button onClick={this.handleInput.bind(this, 843, "Reptiles")} id="group_843" className={`btn species_groups_sprites reptiles_gall_th ${this.state.queryParams
              ? this.state.queryParams.includes("843")
                ? "active"
                : ""
              : null}`} value="843" title="Reptiles"></button>
          </td>
          <td>
            <button onClick={this.handleInput.bind(this, 856, " Molluscs")} className={`btn species_groups_sprites molluscs_gall_th ${this.state.queryParams
              ? this.state.queryParams.includes("856")
                ? "active"
                : ""
              : null}`} id="group_856" value="856" title="Molluscs"></button>
          </td>
          <td>
            <button onClick={this.handleInput.bind(this, 839, "Arthropods")} className={`btn species_groups_sprites arthropods_gall_th ${this.state.queryParams
              ? this.state.queryParams.includes("839")
                ? "active"
                : ""
              : null}`} id="group_839" value="839" title="Arthropods"></button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={this.handleInput.bind(this, 833, "Plants")} className={`btn species_groups_sprites plants_gall_th ${this.state.queryParams
              ? this.state.queryParams.includes("833")
                ? "active"
                : ""
              : null}`} id="group_833" value="833" title="Plants"></button>
          </td>
          <td>
            <button onClick={this.handleInput.bind(this, 831, "Fungi")} className={`btn species_groups_sprites fungi_gall_th ${this.state.queryParams
              ? this.state.queryParams.includes("831")
                ? "active"
                : ""
              : null}`} id="group_831" value="831" title="Fungi"></button>
          </td>
          <td>
            <button onClick={this.handleInput.bind(this, 830, "Others")} className={`btn species_groups_sprites others_gall_th ${this.state.queryParams
              ? this.state.queryParams.includes("830")
                ? "active"
                : ""
              : null}`} id="group_830" value="830" title="Others"></button>
          </td>
        </tr>
      </tbody>
    </table> < /div>
    */}
      </div >)
  }
}
function mapStateToProps(state) {
  return {queryParams: state.Observation.queryParameter};
}
export default connect(mapStateToProps, {ClearObservationPage})(FilterPanel);
