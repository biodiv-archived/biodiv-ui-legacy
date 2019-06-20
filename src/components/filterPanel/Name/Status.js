import React from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


import 'rc-checkbox/assets/index.css';
import StatCounter from '../counter';

class TaxonStatus extends React.Component {
  constructor(){
    super();
    this.state={
      Status:[]
    }

  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    let data=[];
    if (newparams.status) {
       data= newparams.status.split(",");
    }else{
      data=[];
    }
    this.setState({
      Status:data
    })
  }
  componentDidMount(){
    this.setParameter();
  }
  handleCheckboxes(event){
    let Status=this.state.Status;
    if(event.target.checked){
      Status.push(event.target.value);
      let set=new Set(Status);
      Status=Array.from(set);
      set.clear();
    }
    else{
      let set =new Set(Status);
      set.delete(event.target.value);
      Status=Array.from(set);
      set.clear();
    }
    this.setState({
      Status
    })

       let events = new CustomEvent("status-filter",{ "detail":{
           status:Status
       }
       });
       document.dispatchEvent(events);
         event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>
          <Checkbox
            checked={this.state.Status.includes("accepted") ? true : false}
            value={"accepted"}
            onChange={this.handleCheckboxes.bind(this)}
          /> {this.props.LocaleData["filter.name.status.accepted"]} <StatCounter stat={this.props.stat} keyName="ACCEPTED" />
        </div>
        <div>
          <Checkbox
            checked={this.state.Status.includes("synonym") ? true : false}
            value={"synonym"}
            onChange={this.handleCheckboxes.bind(this)}
          /> {this.props.LocaleData["filter.name.status.synonyms"]} <StatCounter stat={this.props.stat} keyName="SYNONYM" />
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {

  return {
    stat: state.Observation.stats
      ? state.Observation.stats.groupStatus
      : null,
    LocaleData:state.LocaleData
  };
}

export default withRouter(connect(mapStateToProps)(TaxonStatus));
