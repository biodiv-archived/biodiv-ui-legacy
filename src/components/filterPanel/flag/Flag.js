import React from 'react';
class FlaggedFilter extends React.Component {


  handleInputChange(event){
    console.log("event",event.target.checked)
  }
  render() {
    return (
      <div>

        <form>
    <div className="radio">
      <label><input type="radio" onClick={this.handleInputChange.bind(this)} name="option" />Option 1</label>
    </div>
    <div className="radio">
      <label><input type="radio" name="option"  onClick={this.handleInputChange.bind(this)} />Option 2</label>
    </div>
  </form>
      </div>
    )
  }
}

export default FlaggedFilter;
