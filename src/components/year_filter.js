import React from 'react';
import InputRange from 'react-input-range';
import style from './year_filter.css';
import '../../node_modules/react-input-range/lib/css/index.css'
class ExampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	 value4: {
        min: 0,
        max: 365,
      },
      value5: {
        min: 1904,
        max: 2017,
      },
    };
  }

  render() {
    return (
      <form className="form">
        <InputRange
          draggableTrack
          maxValue={2017}
          minValue={1904}
          onChange={value => this.setState({ value5: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.value5} />

        
      </form>
    );
  }
}

export default ExampleApp