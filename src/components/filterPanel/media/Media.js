import React from 'react';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

class MediaFilter extends React.Component {
  constructor(){
    super();

  }
  handleCheckboxes(e){
    console.log(e.target.checked);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <label>
            <Checkbox
                value={"audio"}
                onChange={this.handleCheckboxes.bind(this)}
            />{ "Audio"}
        </label>
        <br />
        <label>
            <Checkbox
                value={"video"}
                onChange={this.handleCheckboxes.bind(this)}
            />{ "Video"}
        </label>
        <br />
        <label>
            <Checkbox
                value={"image"}
                onChange={this.handleCheckboxes.bind(this)}
            />{ "Images"}
        </label>
      </div>
    )
  }
}

export default MediaFilter;
