import React, {Component} from 'react';

class AllFilter extends Component{

  constructor(){
    super();
  }

    handleClick(data){
      console.log("sdfgdsfghfsh",data)
      if(data.checked){
        var event = new CustomEvent("all-filter",{ "detail":{
            SpeciesName:data
        }
        });
      }
      else {
          var event = new CustomEvent("all-filter",{ "detail":{
              SpeciesName:""
          }
          });
        }

      document.dispatchEvent(event);
    }
  render(){
    return(
      <div>
        <form className="form from-control">
          <div className="checkbox">
            <label><input type="checkbox" value="" onClick={this.handleClick.bind(this)} />Unknown</label>
            <br />
            <label><input type="checkbox" value="" onClick={this.handleClick.bind(this)} />Known</label>
          </div>
        </form>

      </div>




    )
  }
}
export default AllFilter
