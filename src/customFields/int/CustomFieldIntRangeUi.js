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


componentDidMount(){

}


onChangeValue(){

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
