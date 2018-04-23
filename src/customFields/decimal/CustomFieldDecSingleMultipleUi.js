import React,{Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import 'rc-checkbox/assets/index.css';

class SingleMultiple extends Component{

  constructor(){
    super();
    this.state={

    }

  }

  componentDidMount(){

  }

  render(){
    let {optionValues,groupId,customFieldId}= this.props;
      return(
        <div>
          {optionValues.map((item,index)=>{
            return  <div key={index}><Checkbox  customFieldId={customFieldId} value={item} />{" "+ item}</div>
          })}
        </div>
      )
    }
}
export default SingleMultiple;
