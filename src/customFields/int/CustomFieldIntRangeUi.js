import React,{Component} from 'react';
import queryString from 'query-string';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class Range extends Component{

  constructor(props) {
    super(props);

    this.state = {
      value: { min: 0, max: 100 },
    };
  this.onChangeValue=this.onChangeValue.bind(this)
  }

onChangeValue(value){
  let minMax=[];
  minMax[0]=this.state.value.min;
  minMax[1]=this.state.value.max;
  if(this.state.value.min==0 && this.state.value.max==100){
    //TODO for here
  }
  else{
    this.props.passToCustomFieldValues("range",this.props.customFieldId,minMax);

  }

}
setParameter(customFieldId){
  let newparams = queryString.parse(document.location.search);
  let customName="custom_"+customFieldId+".range";
  Object.keys(newparams).forEach((key)=> {
if(key.includes("custom_"+customFieldId+".range")){
      let min=parseInt(newparams[key].split(",")[0]);
      let max=parseInt(newparams[key].split(",")[1]);
      let value={
        min:min,
        max:max
      };
      this.setState({
        value:value
      })
    }

  });
}

componentDidMount(){
let customFieldId=this.props.customFieldId;
this.setParameter(customFieldId);
}
  render() {

    return (
      <InputRange
        maxValue={100}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })}
        onChangeComplete={this.onChangeValue}
        clasNames={"input-range__label-container"}
      />
    );
  }
}
export default Range;
