import React, {Component} from 'react';
import queryString from 'query-string';
import Checkbox from 'rc-checkbox';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import 'rc-checkbox/assets/index.css';
import StatCounter from '../counter';

class ValidateFilter extends Component{

  constructor(){
    super();
    this.state={
      ValidateFilter:[]
    }
  }
  setParameter(){
    let data=[];
    const newparams = queryString.parse(document.location.search);
    if (newparams.validate) {
      data = newparams.validate.split(",");
    }
    else{
      data=[];
    }
    this.setState({
      ValidateFilter:data
    })
  }
  componentDidMount(){
    this.setParameter();

  }

handleCheckboxes(event){
  let ValidateFilter=this.state.ValidateFilter;
  if(event.target.checked){
    ValidateFilter.push(event.target.value);
    let set=new Set(ValidateFilter);
    ValidateFilter=Array.from(set);
    set.clear();
  }
  else{
    let set =new Set(ValidateFilter);
    set.delete(event.target.value);
    ValidateFilter=Array.from(set);
    set.clear();
  }
  this.setState({
    ValidateFilter
  })

     let events = new CustomEvent("Validate-filter",{ "detail":{
         ValidateFilter:ValidateFilter
     }
     });
     document.dispatchEvent(events);
       event.preventDefault();
  }

  render(){
    return(
      <div>

        {this.props.stat && <>
          <div>
              <Checkbox
                  value={"validate"}
                  checked={ this.state.ValidateFilter.includes("validate")?true:false }
                  onChange={this.handleCheckboxes.bind(this)}
              /> {this.props.LocaleData['filter.dataQuality.validation.validated']} <StatCounter count={this.props.stat["1"]} />
          </div>
          <div>
              <Checkbox
                  value={"invalidate"}
                  checked={ this.state.ValidateFilter.includes("invalidate")?true:false }
                  onChange={this.handleCheckboxes.bind(this)}
              /> {this.props.LocaleData['filter.dataQuality.validation.notValidated']} <StatCounter count={this.props.stat["0"]} />
          </div>
        </>}

      </div>
    )
  }
}
function mapStateToProps(state) {

  return {
    stat: state.Observation.stats
      ? state.Observation.stats.groupValidate
      : null,
    LocaleData:state.LocaleData
  };
}
export default withRouter(connect(mapStateToProps)(ValidateFilter));
