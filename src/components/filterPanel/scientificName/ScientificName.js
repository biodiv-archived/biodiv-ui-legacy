import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';

import 'rc-checkbox/assets/index.css';

class SpeciesNameFilter extends Component{

  constructor(){
    super();
    this.state={
      speciesName:[]
    }
  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    if (newparams.speciesName) {
      const data = newparams.speciesName.split(",");
      this.setState({
        speciesName:data
      })

    }
  }
  componentDidMount(){
    this.setParameter();
  }

handleCheckboxes(event){
  let speciesName=this.state.speciesName;
  if(event.target.checked){
    speciesName.push(event.target.value);
    let set=new Set(speciesName);
    speciesName=Array.from(set);
    set.clear();
  }
  else{
    let set =new Set(speciesName);
    set.delete(event.target.value);
    speciesName=Array.from(set);
    set.clear();
  }
  this.setState({
    speciesName
  })

     let events = new CustomEvent("speciesName-filter",{ "detail":{
         SpeciesName:speciesName
     }
     });
     document.dispatchEvent(events);
       event.preventDefault();
  }

  render(){
    return(
      <div>
        <div>
            <Checkbox
                value={"UNIDENTIFED"}
                checked={ this.state.speciesName.includes("UNIDENTIFED")?true:false }
                onChange={this.handleCheckboxes.bind(this)}
            />{" Unidentified"}
        </div>
        <div>
            <Checkbox
                value={"IDENTIFED"}
                checked={ this.state.speciesName.includes("IDENTIFED")?true:false }
                onChange={this.handleCheckboxes.bind(this)}
            />{" Identified"}
        </div>
      </div>
    )
  }
}
export default SpeciesNameFilter;
