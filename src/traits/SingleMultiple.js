import React,{Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';

import 'rc-checkbox/assets/index.css';
import {getTraitValues} from './TraitsApiCall';

class Single extends Component{

  constructor(){
    super();
    this.state={
      traitValueList:[],
      traitSelectedValues:[]
    }

  }

  callFilter(id,traitSelectedValues){
      this.props.passToTraitValues("string",id,traitSelectedValues);
  }

  onChange(e){
    let traitSelectedValues=this.state.traitSelectedValues;
    if(e.target.checked){
      traitSelectedValues.push(e.target.traitValue)
    }
    else{
      traitSelectedValues=traitSelectedValues.filter((i)=> {
        return i != e.target.traitValue
      });
    }

  this.callFilter(this.props.traitId,traitSelectedValues);
    this.setState({
      traitSelectedValues
    })
  }
  setParameter(traitId){
    let newparams = queryString.parse(document.location.search);
    Object.keys(newparams).forEach((key)=> {
      if(key.includes("trait_"+traitId+".string")){
      this.setState({
        traitSelectedValues:newparams[key].split(",")
      })
      }
    });
  }
  componentDidMount(){
    let {traitId}=this.props;
    this.setParameter(traitId);
  getTraitValues(traitId).then(data=>{
    this.setState({
      traitValueList:data,
    })
    })
  }

  render(){
      let traitValueList=this.state.traitValueList;
      let traitSelectedValues=this.state.traitSelectedValues;
      return(
        <div>
          {traitValueList.data?traitValueList.data.map((item,index)=>{
            return  <div key={index}><Checkbox defaultChecked={traitSelectedValues.includes(item.id.toString())?true:false} onChange={this.onChange.bind(this)} traitValue={item.id} traitId={item.traitId} />{" "+ item.value}</div>
          }):null}
        </div>
      )
    }
}
export default Single;
