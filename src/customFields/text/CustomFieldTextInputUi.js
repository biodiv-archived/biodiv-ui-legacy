import React,{Component} from 'react';
import queryString from 'query-string';

class TextInput extends Component{

  constructor(){
    super();
    this.state={

    }

  }

  componentDidMount(){

  }

  render(){
    let {groupId,customFieldId}= this.props;
      return(
        <div>
          <input  className="form-control" type="text"  />
        </div>
      )
    }
}
export default TextInput;
