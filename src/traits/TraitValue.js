import React,{Component} from 'react';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

import {getTraitValues} from './TraitsApiCall';

class TraitValue extends Component{
  constructor(){
    super();
    this.state={
        traitValueList:[]
    }
  }
  componentDidMount(){
    let {id}=this.props;
  getTraitValues(id).then(data=>{
    this.setState({
      traitValueList:data
    })
    })
  }

onChange(e){
console.log('Checkbox checked:', e.target.traitId,e.target.checked,e.target.id);
}
  render(){
    let traitValueList=this.state.traitValueList;

    return(
      <div>
        {traitValueList.data?traitValueList.data.map((item,index)=>{
          return  <div key={index}><Checkbox id={item.id} traitId={item.traitId} onChange={this.onChange.bind(this)} />{" "+ item.value}</div>
        }):null}
      </div>
    )
  }
}
export default TraitValue
