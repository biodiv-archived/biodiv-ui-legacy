import React, {Component} from 'react';

import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

class SpeciesNameFilter extends Component{

  constructor(){
    super();
    this.state={
      checked:undefined
    }
  }


handleCheckboxes(event){
    var event = new CustomEvent("speciesName-filter",{ "detail":{
        SpeciesName:event.target.value
    }
    });
    document.dispatchEvent(event);
      event.preventDefault();
  }

  render(){
    return(
      <div>

        <label>
            <Checkbox
                value={"UNIDENTIFED"}
                onChange={this.handleCheckboxes.bind(this)}
            />{"UnKnown"}
        </label>
        <br />
        <label>
            <Checkbox
                value={"IDENTIFED"}
                onChange={this.handleCheckboxes.bind(this)}
            />{"Known"}
        </label>
        
      </div>
    )
  }
}
export default SpeciesNameFilter;
