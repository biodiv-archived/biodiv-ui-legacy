import React, {Component} from 'react';
import queryString from 'query-string';
import Checkbox from 'rc-checkbox';

import 'rc-checkbox/assets/index.css';

class ValidateFilter extends Component{

  constructor(){
    super();
    this.state={
      ValidateFilter:[]
    }
  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    if (newparams.validate) {
      const data = newparams.validate.split(",");
      this.setState({
        ValidateFilter:data
      })

    }
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

        <label>
            <Checkbox
                value={"validate"}
                checked={ this.state.ValidateFilter.includes("validate")?true:false }
                onChange={this.handleCheckboxes.bind(this)}
            />{"Validate"}
        </label>
        <br />
        <label>
            <Checkbox
                value={"invalidate"}
                checked={ this.state.ValidateFilter.includes("invalidate")?true:false }
                onChange={this.handleCheckboxes.bind(this)}
            />{"invalidate"}
        </label>

      </div>
    )
  }
}
export default ValidateFilter;
