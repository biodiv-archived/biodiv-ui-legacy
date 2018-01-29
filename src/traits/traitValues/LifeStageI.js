import React,{Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import 'rc-checkbox/assets/index.css';
import {getTraitValues} from '../TraitsApiCall';
class LifeStageI extends Component{
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
    if (newparams.trait_10) {
      const data = newparams.trait_10.split(",");
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
      let events = new CustomEvent("trait_10-filter",{ "detail":{
          trait_10:values
      }
      });
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
    let traitValues=this.state.traitValues;
    traitValues=traitValues.map(Number);
    return(
      <div>
        {traitValueList.data?traitValueList.data.map((item,index)=>{
          return  <div key={index}><Checkbox defaultChecked={traitValues.includes(item.id)?true:false} onChange={this.onChange.bind(this)} traitValue={item.id} traitId={item.traitId} />{" "+ item.value}</div>
        }):null}
      </div>
    )

}
}
export default LifeStageI
