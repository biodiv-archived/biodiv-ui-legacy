import React from 'react';
import { SketchPicker } from 'react-color';

class ColorTrait extends React.Component {
  constructor(){
    super();
    this.state = {
      background: '#fff',
    };
    this.handleChangeComplete=this.handleChangeComplete.bind(this)
  }


  handleChangeComplete(color){
    console.log(color.hsl);
    this.setState({ background: color.hsl });
          let colorArray=[];
          colorArray.push(Math.trunc(color.hsl.h));
          colorArray.push(Math.trunc(color.hsl.s*100));
          colorArray.push(Math.trunc(color.hsl.l*100));
          this.props.passToTraitValues("color_hsl",this.props.traitId,colorArray);
  }

  render() {
    return (
      <SketchPicker
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}
export default ColorTrait;
