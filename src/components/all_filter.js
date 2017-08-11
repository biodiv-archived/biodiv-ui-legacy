import React, {Component} from 'react';

class AllFilter extends Component{

  constructor(){
    super();
  }

    handleClick(){
      var event = new CustomEvent("all-filter",{ "detail":{
          SpeciesName:"Unknown"
      }
      });
      document.dispatchEvent(event);
    }
  render(){
    return(
      <div>
        <div className="checkbox">
          <label><input type="checkbox" value="" onClick={this.handleClick.bind(this,true)} />Flagged</label>
          <br />
          <label><input type="checkbox" value="" onClick={this.handleClick} />Un flagged</label>
        </div>
        <div className="checkbox">
          <label><input type="checkbox" value="" onClick={this.handleClick} />Identified</label>
            <br />
          <label><input type="checkbox" value="" onClick={this.handleClick} />Unidentified</label>
        </div>
        <div className="checkbox disabled">
          <label><input type="checkbox" value="" onClick={this.handleClick} />With Media</label>
            <br />
          <label><input type="checkbox" value="" onClick={this.handleClick} />Without Media</label>
        </div>

      </div>




    )
  }
}
export default AllFilter
