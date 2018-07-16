import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import CustomFieldTextSingleMultipleUi from './CustomFieldTextSingleMultipleUi';
import CustomFieldTextInputUi from './CustomFieldTextInputUi';

import 'rc-checkbox/assets/index.css';
class CustomFieldTextUi extends Component {

constructor(){
  super();
  this.state={

  }
}
callRespectiveUiForText(optionValues,groupId,customFieldId){
  if(optionValues.length>0){
    return <CustomFieldTextSingleMultipleUi passToCustomFieldValues={this.props.passToCustomFieldValues} optionValues={optionValues} customFieldId={customFieldId} groupId={groupId} />
  }
  else{
    return <CustomFieldTextInputUi passToCustomFieldValues={this.props.passToCustomFieldValues}  customFieldId={customFieldId} groupId={groupId} />
  }

}
render(){
  let {groupId,customFieldId,options}=this.props;
  let optionValues=[];
  if(options){
    optionValues=options.split(",");
  }
  return(
    <div>
      {this.callRespectiveUiForText(optionValues,groupId,customFieldId)}
    </div>
  )
}
}
export default CustomFieldTextUi;
