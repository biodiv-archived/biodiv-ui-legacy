import React from 'react';
class MediaFilter extends React.Component {
  constructor(){
    super();
    this.state={
      checked:undefined
    }
  }
  clearSpeciesName(){



  }

  handleInputChange(event){
    if(event.target.checked){
      var event = new CustomEvent("isMediaFilter-filter",{ "detail":{
          MediaFilter:event.target.value
      }
      });
    }
    document.dispatchEvent(event);
    }


  render() {
    return (
      <div>
        <form className="form from-control">
          <div className="radio">
            <label><input checked={this.state.checked} type="radio" name="same" value="true" onChange={this.handleInputChange.bind(this)} />With Media</label>
            <br />
            <label><input  checked={this.state.checked} type="radio" name="same" value="false" onChange={this.handleInputChange.bind(this)} />Without Media</label>
          </div>
          <button onClick={this.clearSpeciesName.bind(this)} className="btn btn-xs btn-danger"><span className="glyphicon glyphicon-trash"></span></button>
        </form>
      </div>
    )
  }
}

export default MediaFilter;
