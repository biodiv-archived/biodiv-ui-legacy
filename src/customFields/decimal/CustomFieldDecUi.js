import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import 'rc-checkbox/assets/index.css';

import CustomFieldDecRangeUi from './CustomFieldDecRangeUi';
import CustomFieldDecSingleMultipleUi from './CustomFieldDecSingleMultipleUi';

class CustomFieldDecUi extends Component {

constructor(){
  super();
  this.state={

  }
}
callRespectiveUiForText(optionValues,groupId,customFieldId){
  if(optionValues.length>0){
    return <CustomFieldDecSingleMultipleUi optionValues={optionValues} customFieldId={customFieldId} groupId={groupId} />
  }
  else{
    return <CustomFieldDecRangeUi  customFieldId={customFieldId} groupId={groupId} />
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
export default CustomFieldDecUi;
