import React,{Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';

import 'rc-checkbox/assets/index.css';

import {getTraitValues} from './TraitsApiCall';

class TraitValue extends Component{
  constructor(){
    super();
    this.state={
        traitValueList:[],
        traitIds:[],
        traitValues:[]
    }
  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    if (newparams.trait_8) {
      const data = newparams.trait_8.split(",");
      this.setState({
        traitValues:data
      })

    }
  }
  componentDidMount(){
    this.setParameter()
    let {id}=this.props;
    let traitIds=this.state.traitIds;
    traitIds.push(id);
  getTraitValues(id).then(data=>{
    this.setState({
      traitValueList:data,
      traitIds
    })
    })
  }
callFilter(id,values){
  if(id===8){
    var events = new CustomEvent("trait_8-filter",{ "detail":{
        trait_8:values
    }
    });
  }
  if(id===9){
    var events = new CustomEvent("trait_9-filter",{ "detail":{
        trait_9:values
    }
    });
  }
  if(id===10){
    var events = new CustomEvent("trait_10-filter",{ "detail":{
        trait_10:values
    }
    });
  }
  if(id===11){
    var events = new CustomEvent("trait_11-filter",{ "detail":{
        trait_11:values
    }
    });
  }
  if(id===12){
    var events = new CustomEvent("trait_12-filter",{ "detail":{
        trait_12:values
    }
    });
  }
  if(id===13){
    var events = new CustomEvent("trait_13-filter",{ "detail":{
        trait_13:values
    }
    });
  }
  if(id===15){
    var events = new CustomEvent("trait_15-filter",{ "detail":{
        trait_15:values
    }
    });
  }
     document.dispatchEvent(events);
}
onChange(e){
  let traitValues=this.state.traitValues;
  if(e.target.checked){
  traitValues.push(e.target.traitValue)
  }
  else{
    traitValues=traitValues.filter((i)=> {
      return i != e.target.traitValue
    });

  }
this.callFilter(this.props.id,traitValues);
  this.setState({
    traitValues
  })

  e.preventDefault();
}
  render(){
    let traitValueList=this.state.traitValueList;
    return(
      <div>
        {traitValueList.data?traitValueList.data.map((item,index)=>{
          return  <div key={index}><Checkbox checked={this.state.traitValues.includes(item.id)?true:false} traitValue={item.id} traitId={item.traitId} onChange={this.onChange.bind(this)} />{" "+ item.value}</div>
        }):null}
      </div>
    )
  }
}

export default TraitValue
