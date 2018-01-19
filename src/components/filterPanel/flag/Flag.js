import React from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';

import 'rc-checkbox/assets/index.css';

class FlaggedFilter extends React.Component {

   constructor(){
    super();
    this.state={
      isFlagged:[]
    }

  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    if (newparams.isFlagged) {
      const data = newparams.isFlagged.split(",");
      this.setState({
        isFlagged:data
      })

    }
  }
  componentDidMount(){
    this.setParameter();
  }


  handleCheckboxes(event){
    let isFlagged=this.state.isFlagged;
    if(event.target.checked){
      isFlagged.push(event.target.value);
      let set=new Set(isFlagged);
      isFlagged=Array.from(set);
      set.clear();
    }
    else{
      let set =new Set(isFlagged);
      set.delete(event.target.value);
      isFlagged=Array.from(set);
      set.clear();
    }
    this.setState({
      isFlagged
    })

       let events = new CustomEvent("flag-filter",{ "detail":{
           isFlagged:isFlagged
       }
       });
       document.dispatchEvent(events);

         event.preventDefault();

  }
  render() {
    return (
      <div>
        <label>
            <Checkbox
                checked={this.state.isFlagged.includes("0")?true:false}
                value={"0"}
                onChange={this.handleCheckboxes.bind(this)}
            />{"UnFlagged"}
        </label>
        <br />
        <label>
            <Checkbox
              checked={this.state.isFlagged.includes("1")?true:false}
                value={"1"}
                onChange={this.handleCheckboxes.bind(this)}
            />{"Falgged"}
        </label>

      </div>
    )
  }
}

export default FlaggedFilter;
