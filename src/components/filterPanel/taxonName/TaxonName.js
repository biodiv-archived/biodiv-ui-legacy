import React from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';


import 'rc-checkbox/assets/index.css';

class TaxonNames extends React.Component {
  constructor(){
    super();
    this.state={
      TaxonName:[]
    }

  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    let data=[];
    if (newparams.taxonName) {
       data= newparams.taxonName.split(",");
    }else{
      data=[];
    }
    this.setState({
      TaxonName:data
    })
  }
  componentDidMount(){
    this.setParameter();
  }
  handleCheckboxes(event){
    let TaxonName=this.state.TaxonName;
    if(event.target.checked){
      TaxonName.push(event.target.value);
      let set=new Set(TaxonName);
      TaxonName=Array.from(set);
      set.clear();
    }
    else{
      let set =new Set(TaxonName);
      set.delete(event.target.value);
      TaxonName=Array.from(set);
      set.clear();
    }
    this.setState({
      TaxonName
    })

       let events = new CustomEvent("taxon-name-filter",{ "detail":{
           taxonName:TaxonName
       }
       });
       document.dispatchEvent(events);
         event.preventDefault();
  }

  render() {
    return (
      <div>

        <div>
            <Checkbox
                checked={ this.state.TaxonName.includes("accepted")?true:false }
                value={"accepted"}
                onChange={this.handleCheckboxes.bind(this)}
            />{" Accepted"}
        </div>
        <div>
            <Checkbox
                checked={ this.state.TaxonName.includes("synonym")?true:false }
                value={"synonym"}
                onChange={this.handleCheckboxes.bind(this)}
            />{" Synonyms"}
        </div>
        <div>
            <Checkbox
                checked={ this.state.TaxonName.includes("none")?true:false }
                value={"none"}
                onChange={this.handleCheckboxes.bind(this)}
            />{" None"}
        </div>
      </div>
    )
  }
}

export default  withRouter(TaxonNames);
