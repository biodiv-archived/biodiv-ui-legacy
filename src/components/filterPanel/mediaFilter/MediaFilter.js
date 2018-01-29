import React, {Component} from 'react';

import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

class SpeciesNameFilter extends Component{

  constructor(){
    super();
    this.state={
      media:[]
    }
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

        <label>
            <Checkbox
                value={"noofaudio"}
                onChange={this.handleCheckboxes.bind(this)}
            />{"Audio"}
        </label>
        <br />
        <label>
            <Checkbox
                value={"noofvideos"}
                onChange={this.handleCheckboxes.bind(this)}
            />{"Video"}
        </label>
        <br />
        <label>
            <Checkbox
                value={"noofimages"}
                onChange={this.handleCheckboxes.bind(this)}
            />{"Images"}
        </label>
      </div>
    )
  }
}
export default SpeciesNameFilter;
