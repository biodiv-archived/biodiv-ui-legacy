import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';

import 'rc-checkbox/assets/index.css';
class CustomFieldParaUi extends Component {

constructor(){
  super();
  this.state={

  }
}
render(){
  let {groupId,customFieldId,options}=this.props;

  return(
    <div>
      <div>
          <Checkbox
              value={"1"}
          />{" Has content"}
      </div>
      <div>
          <Checkbox
              value={"0"}

          />{" No content"}
      </div>
    </div>
  )
}
}
export default CustomFieldParaUi;
