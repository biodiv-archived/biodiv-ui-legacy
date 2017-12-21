import React from 'react';
import InputRange from 'react-input-range';
import style from './Day.css';
import '../../../../node_modules/react-input-range/lib/css/index.css';

class ExampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        min: 1,
        max: 31,
      },
    };
  }
  onChangeComplete(value){
    var event = new CustomEvent("day-filter", {
      "detail": {
        maxDay: value.max,
        minDay:value.min
      }
    });
    document.dispatchEvent(event);
  }
  render() {
    return (
      <form className="form">
        <InputRange
          draggableTrack
          maxValue={31}
          minValue={1}
          onChange={value => this.setState({ value: value })}
          onChangeComplete={this.onChangeComplete.bind(this)}
          value={this.state.value} />
      </form>
    );
  }
}

export default ExampleApp
