import React from 'react';
import InputRange from 'react-input-range';
import style from './month_filter.css';
import '../../node_modules/react-input-range/lib/css/index.css'
class TraitsApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        min: 0,
        max: 365,
      },
    };
  }

  render() {
    return (
      <form className="form">
        <InputRange
          draggableTrack
          maxValue={365}
          minValue={0}
          onChange={value => this.setState({ value: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.value} />
      </form>
    );
  }
}

export default TraitsApp