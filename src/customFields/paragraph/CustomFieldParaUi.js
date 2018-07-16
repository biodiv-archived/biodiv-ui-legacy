import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';

import 'rc-checkbox/assets/index.css';
class CustomFieldParaUi extends Component {

constructor(){
  super();
  this.state={
    CustomFieldsValues:[]
  }
}
callFilter(id,CustomFieldsValues){
    this.props.passToCustomFieldValues("para",id,CustomFieldsValues);
}
onChange(e){
  let CustomFieldsValues=this.state.CustomFieldsValues;
  if(e.target.checked){
    CustomFieldsValues.push(e.target.value)
  }
  else{
    CustomFieldsValues=CustomFieldsValues.filter((i)=> {
      return i != e.target.value
    });
  }

this.callFilter(this.props.customFieldId,CustomFieldsValues);
  this.setState({
    CustomFieldsValues
  })

}
setParameter(customFieldId){
  let newparams = queryString.parse(document.location.search);
  Object.keys(newparams).forEach((key)=> {
    if(key.includes("custom_"+customFieldId+".para")){
    this.setState({
      CustomFieldsValues:newparams[key].split(",")
    })
    }
  });
}
componentDidMount(){
  let {customFieldId}=this.props;
  this.setParameter(customFieldId);
}


render(){
  let {groupId,customFieldId,options}=this.props;
  let CustomFieldsValues=this.state.CustomFieldsValues;
  console.log(CustomFieldsValues);
  return(
    <div>
      <div>
          <Checkbox
              value={"1"}
               onChange={this.onChange.bind(this)}
               checked={CustomFieldsValues.includes("1")}
          />{" Has content"}
      </div>
      <div>
          <Checkbox
              value={"0"}
              onChange={this.onChange.bind(this)}
              checked={CustomFieldsValues.includes("0")}
          />{" No content"}
      </div>
    </div>
  )
}
}
export default CustomFieldParaUi;
