import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ClearObservationPage} from '../../actions/index';
import styles from './style.css';
class FilterPanel extends Component{
  constructor(props){
    super(props);
    this.state={
      active:false
    }

  }
  handleInput(value){
    this.setState({
      active:true
    })
    this.props.ClearObservationPage();
    var event = new CustomEvent("group-event",{ "detail":{
        sGroup:value
    }
  });
  document.dispatchEvent(event);
  };
  render(){
    return (
      <div>
        <div id="speciesGroupFilter" data-toggle="buttons-radio">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <button onClick={this.handleInput.bind(this,829)} className="btn species_groups_sprites all_gall_th" id="group_829" value="829"  title="All"></button>
                 </td>
                <td>
                  <button onClick={this.handleInput.bind(this,841)} className="btn species_groups_sprites mammals_gall_th" id="group_841" value="841"  title="Mammals"></button>
                </td>
                <td>
                  <button onClick={this.handleInput.bind(this,837)} className="btn species_groups_sprites birds_gall_th" id="group_837" value="837"  title="Birds"></button>
                </td>
                <td>
                  <button  onClick={this.handleInput.bind(this,845)} className="btn species_groups_sprites fish_gall_th " id="group_845" value="845"  title="Fish"></button>
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={this.handleInput.bind(this,835)} className="btn species_groups_sprites amphibians_gall_th" id="group_835" value="835"  title="Amphibians"></button>
                </td>
                <td>
                  <button onClick={this.handleInput.bind(this,843)} className="btn species_groups_sprites reptiles_gall_th" id="group_843" value="843"  title="Reptiles"></button>
                </td>
                <td>
                  <button onClick={this.handleInput.bind(this,856)} className="btn species_groups_sprites molluscs_gall_th" id="group_856" value="856"  title="Molluscs"></button>
                </td>
                <td>
                  <button onClick={this.handleInput.bind(this,839)} className="btn species_groups_sprites arthropods_gall_th" id="group_839" value="839"  title="Arthropods"></button>
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={this.handleInput.bind(this,833)} className="btn species_groups_sprites plants_gall_th" id="group_833" value="833"  title="Plants"></button>
                </td>
                <td>
                  <button onClick={this.handleInput.bind(this,831)} className="btn species_groups_sprites fungi_gall_th" id="group_831" value="831"  title="Fungi"></button>
                </td>
                <td>
                  <button onClick={this.handleInput.bind(this,830)} className="btn species_groups_sprites others_gall_th" id="group_830" value="830"  title="Others"></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default connect(null,{ClearObservationPage})(FilterPanel);
