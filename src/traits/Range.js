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
  setParameter(traitId){
    let newparams = queryString.parse(document.location.search);
    let traitName="trait_"+traitId+".range";
    Object.keys(newparams).forEach((key)=> {
      if(key===traitName){
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
  let traitId=this.props.traitId;
  this.setParameter(traitId);
}


onChangeValue(){
  let minMax=[];
  minMax.push(this.state.value.min);
  minMax.push(this.state.value.max);
  this.props.passToTraitValues("range",this.props.traitId,minMax);
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
