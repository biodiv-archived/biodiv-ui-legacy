import React from 'react';
import { CompactPicker } from 'react-color';

class ColorTrait extends React.Component {
  constructor(){
    this.state = {
      background: '#fff',
    };
    this.handleChangeComplete=this.handleChangeComplete.bind(this)
  }


  handleChangeComplete(color){
    this.setState({ background: color.hex });
    console.log(color.hex);
  }

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
