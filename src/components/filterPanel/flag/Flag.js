import React from 'react';

import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

class FlaggedFilter extends React.Component {


  handleCheckboxes(event){
    console.log("event",event.target.checked)
  }
  render() {
    return (
      <div>
        <label>
            <Checkbox
                value={"UnFlagged"}
                onChange={this.handleCheckboxes.bind(this)}
            />{"UnFlagged"}
        </label>
        <br />
        <label>
            <Checkbox
                value={"Flagged"}
                onChange={this.handleCheckboxes.bind(this)}
            />{"Falgged"}
        </label>

      </div>
    )
  }
}

export default FlaggedFilter;
