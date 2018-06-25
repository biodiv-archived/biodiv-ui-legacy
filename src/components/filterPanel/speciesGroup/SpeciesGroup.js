import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import {Config}  from '../../../Config';
import queryString from 'query-string';
import styles from './style.css';

function remove(array, element) {
    return array.filter(e => e !== element);
}
class FilterPanel extends Component{
  constructor(props){
    super(props);
    this.state={
      sGroupId:[],
      list:[]
    }

  }
  getData(){
    axios.get(`${Config.api.API_ROOT_URL}/species/list`).then((response)=>{
      this.setState({
        list:response.data
      })
    })
  }
  setParameter() {
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
  componentDidMount(){
    this.getData();
    this.setParameter();

  }
  handleInput(id){
      // console.log(data);
        console.log(this.refs[id].classList);
      let sGroupId=this.state.sGroupId;
      if(this.refs[id].classList.contains("active")){
        sGroupId.push(id);
        sGroupId=_.uniq(sGroupId);
      }
      else{
          sGroupId=remove(sGroupId, id);
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
  };
  render(){
    return (
      <div id="speciesGroupFilter" data-toggle="buttons-radio">
        <ul className="list-unstyled list-inline list-responsive">
          {this.state.list.map(item=>{
              return(
                <li key={item.id}>
                  <button style={{borderRadius:'100%',border:'solid thin #5B5757'}} ref={item.id.toString()} onClick={this.handleInput.bind(this,item.id.toString())} title={item.name} value={item.id.toString()} name={item.name} className={`btn species_groups_sprites ${item.name.toLowerCase()}_gall_th ${this.state.sGroupId.includes(item.id.toString())?'active':""}`}>
                  </button>
                </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
export default connect(null)(FilterPanel);
