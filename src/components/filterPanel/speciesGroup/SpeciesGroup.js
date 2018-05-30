import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import axios from 'axios';
import Checkbox from 'rc-checkbox';
import _ from 'lodash';
import 'rc-checkbox/assets/index.css';
import {withRouter} from 'react-router-dom';


import {ClearObservationPage} from '../../../actions/index';
import {Config}  from '../../../Config';

function remove(array, element) {
    return array.filter(e => e !== element);
}

class SpeciesGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sGroupId:[],
      list:[]
    }
  }

  setParameter() {
    console.log("this thing called");
    const newparams = queryString.parse(document.location.search);
    let data =[];
    if (newparams.sGroup) {
       data = newparams.sGroup.split(",");
    }
    else{
      data=[];
    }
    console.log(data);
    this.setState({
      sGroupId:data
    })
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


  sChanged(e){
    let sGroupId=this.state.sGroupId;
    if(e.target.checked){
        sGroupId.push(e.target.id);
        sGroupId=_.uniq(sGroupId);
    }
    else{
      sGroupId=remove(sGroupId, e.target.id);
    }

      this.setState({
        sGroupId
      },()=>{
        var event = new CustomEvent("sGroup-filter", {
          "detail": {
            sGroup: sGroupId,
          }
        });
        document.dispatchEvent(event);
      });

    }
  render() {
    return (
      <div>
         {this.state.list?this.state.list.map((item,index)=>{
           return(
             <div key={index}>
             <Checkbox
               checked={this.state.sGroupId.includes(item.id.toString())}
               id={item.id.toString()}
               onChange={this.sChanged.bind(this)}
             />{" "+item.name}
             </div>
         )
         }):null}
       </div>
    )
  }
}
export default  withRouter(SpeciesGroup);
