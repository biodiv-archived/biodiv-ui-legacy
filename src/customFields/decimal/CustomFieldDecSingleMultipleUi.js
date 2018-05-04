import React,{Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import 'rc-checkbox/assets/index.css';

class SingleMultiple extends Component{

  constructor(){
    super();
    this.state={
      ustomFieldsValues:[]
    }

  }

  callFilter(id,CustomFieldsValues){
      this.props.passToCustomFieldValues("string",id,CustomFieldsValues);
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
      if(key.includes("custom_"+customFieldId+".string")){

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
    let {optionValues,groupId,customFieldId}= this.props;
    let CustomFieldsValues=this.state.CustomFieldsValues;
    
      return(
        <div>
          {optionValues.map((item,index)=>{
            return  <div key={index}><Checkbox  checked={CustomFieldsValues.includes(item)?true:false} customFieldId={customFieldId} onChange={this.onChange.bind(this)}  value={item} />{" "+ item}</div>
          })}
        </div>
      )
    }
}
export default SingleMultiple;
