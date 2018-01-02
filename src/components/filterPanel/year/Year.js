import React from 'react';
import InputRange from 'react-input-range';
import style from './Year.css';
import '../../../../node_modules/react-input-range/lib/css/index.css';

class ExampleApp extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      value: {
        min: 1970,
        max: 2018,
      },
    };
  }

  onChangeComplete(value){

    var event = new CustomEvent("year-filter", {
      "detail": {
        maxYear: value.max,
        minYear:value.min
      }
    });
    document.dispatchEvent(event);

  }

  render() {
    return (
      <form className="form">
        <InputRange
          draggableTrack
          maxValue={2018}
          minValue={1970}
          onChange={value => this.setState({ value: value })}
          onChangeComplete={this.onChangeComplete.bind(this)}
          value={this.state.value} />
      </form>
    );
  }
}

export default ExampleApp