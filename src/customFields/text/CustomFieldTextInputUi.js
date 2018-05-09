import React,{Component} from 'react';
import queryString from 'query-string';

class TextInput extends Component{

  constructor(props) {
      super(props);
      this.state = {
        value: ''
          };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let CustomFieldValues=[];
    CustomFieldValues[0]=this.state.value;
    this.props.passToCustomFieldValues("text",this.props.customFieldId,CustomFieldValues);
    event.preventDefault();
  }
  setParameter(customFieldId){
    let newparams = queryString.parse(document.location.search);
    Object.keys(newparams).forEach((key)=> {
      if(key.includes("custom_"+customFieldId+".text")){

      this.setState({
        value:newparams[key]
      })
      }
    });
  }
  componentDidMount(){
    let {customFieldId}=this.props;
    this.setParameter(customFieldId);
  }


  render(){
    let {groupId,customFieldId}= this.props;
      return(
        <div>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group mb-10">
              <label htmlFor="staticEmail2" className="sr-only">Type here</label>
              <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange}  />
            </div>
            {"  "}
            <button type="submit"  className="btn btn-primary mb-2"><span className="glyphicon glyphicon-search"></span></button>
          </form>
        </div>
      )
    }
}
export default TextInput;
