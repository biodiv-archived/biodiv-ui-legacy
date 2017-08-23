import React, {Component} from 'react';

class SpeciesNameFilter extends Component{

  constructor(){
    super();
    this.state={
      checked:undefined
    }
  }

  handleInputChange(event){

  if(event.target.checked){
    var event = new CustomEvent("speciesName-filter",{ "detail":{
        SpeciesName:event.target.value
    }
    });
  }

    document.dispatchEvent(event);
      event.preventDefault();
  }
  clearSpeciesName(){
    var event = new CustomEvent("speciesName-filter",{ "detail":{
        SpeciesName:""
    }
    });
    document.dispatchEvent(event);
  }
  render(){
    return(
      <div>
        <form className="form from-control">
          <div className="radio">
            <label><input type="radio" name="same" value="UNIDENTIFED" onChange={this.handleInputChange.bind(this)} />Unknown</label>
            <br />
            <label><input  type="radio" name="same" value="IDENTIFED" onChange={this.handleInputChange.bind(this)} />Known</label>
          </div>
          <button onClick={this.clearSpeciesName.bind(this)} className="btn btn-xs btn-danger"><span className="glyphicon glyphicon-trash"></span></button>
        </form>
      </div>
    )
  }
}
export default SpeciesNameFilter;
