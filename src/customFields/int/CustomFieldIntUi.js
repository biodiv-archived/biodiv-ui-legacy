import React, {Component} from 'react';

import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import CustomFieldIntRangeUi from './CustomFieldIntRangeUi';
import CustomFieldIntSingleMultipleUi from './CustomFieldIntSingleMultipleUi';

import 'rc-checkbox/assets/index.css';

class CustomFieldIntUi extends Component {

constructor(){
  super();
  this.state={

  }
}
callRespectiveUiForText(optionValues,groupId,customFieldId){
  if(optionValues.length>0){
    return <CustomFieldIntSingleMultipleUi passToCustomFieldValues={this.props.passToCustomFieldValues} optionValues={optionValues} customFieldId={customFieldId} groupId={groupId} />
  }
  else{
    return <CustomFieldIntRangeUi passToCustomFieldValues={this.props.passToCustomFieldValues}  customFieldId={customFieldId} groupId={groupId} />
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
export default CustomFieldIntUi;
