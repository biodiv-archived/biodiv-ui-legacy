import React, {Component} from 'react';
import CustomFieldDateUi from './date/CustomFieldDateUi';
import CustomFieldParaUi from './paragraph/CustomFieldParaUi';
import CustomFieldTextUi from './text/CustomFieldTextUi';
import CustomFieldIntUi from './int/CustomFieldIntUi';
import CustomFieldDecUi from './decimal/CustomFieldDecUi';

class CustomFieldsValues extends Component {

constructor(){
  super();
  this.state={

  }
}
showCustomFieldOptions(groupId,customFieldId,dataType,allowedMultiple,options){
  console.log(groupId,customFieldId,dataType,allowedMultiple,options);
  if(dataType=="DATE"){
  return  <CustomFieldDateUi groupId={groupId} customFieldId={customFieldId} options={options} />
  }
  if(dataType=='PARAGRAPH_TEXT'){
    return <CustomFieldParaUi groupId={groupId} customFieldId={customFieldId} options={options} />
  }
  if(dataType=="TEXT"){
  return  <CustomFieldTextUi groupId={groupId} customFieldId={customFieldId} options={options} />
  }
  if(dataType=="INTEGER"){
  return  <CustomFieldIntUi groupId={groupId} customFieldId={customFieldId} options={options} />
  }
  if(dataType=="DECIMAL"){
    return  <CustomFieldDecUi groupId={groupId} customFieldId={customFieldId} options={options} />
  }

}
  render(){
    let {groupId,customFieldId,dataType,allowedMultiple,options}=this.props;

    return(
      <div>
      {this.showCustomFieldOptions(groupId,customFieldId,dataType,allowedMultiple,options)}
      </div>
    )
  }
}
export default CustomFieldsValues
