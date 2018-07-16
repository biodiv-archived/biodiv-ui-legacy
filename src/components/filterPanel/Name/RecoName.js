import React,{Component} from 'react';
import queryString from 'query-string';

class RecoName extends Component{

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

    let events = new CustomEvent("recoName-filter",{ "detail":{
        recoName:this.state.value
    }
    });
    document.dispatchEvent(events);
      event.preventDefault();
  }
  setParameter(){
    let newparams = queryString.parse(document.location.search);
    if(newparams.recoName){
      this.setState({
        value:newparams.recoName
      })
    }

  }
  componentDidMount(){
    this.setParameter();

  }


  render(){

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
export default RecoName;
