import React from 'react';
import { CompactPicker } from 'react-color';

class ColorTrait extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    console.log(color.hex);
  };

  render() {
    return (
      <CompactPicker
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}
export default ColorTrait;
