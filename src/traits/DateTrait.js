import React,{Component} from 'react';
import queryString from 'query-string';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
class DateTrait extends Component{

  constructor(props) {
    super(props);

    this.state = {
      value: { min: 0, max: 100 },
    };
  this.onChangeValue=this.onChangeValue.bind(this)
  }

onChangeValue(){
  console.log(this.state.value);
}
  render() {
    return (
      <InputRange
        formatLabel={value => `${value}`}
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
export default DateTrait;
