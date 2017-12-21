import React from 'react';
import style from './Month.css';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import _ from 'lodash';

function remove(array, element) {
    return array.filter(e => e !== element);
}
class MonthApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      monthSelected:[]
    };
  }

onChange(e){
let id=e.target.id;
let newMonthSelected=this.state.monthSelected;
if(e.target.checked){
  newMonthSelected.push(id);
}
else{
  newMonthSelected=remove(newMonthSelected, id);
}
 newMonthSelected=Array.from(new Set(newMonthSelected));
  this.setState({
    monthSelected:newMonthSelected
  })

    var event = new CustomEvent("months-filter", {
      "detail": {
      months:newMonthSelected
      }
    });
    document.dispatchEvent(event);

}

  render() {
    return (
      <div>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"1"}
            defaultChecked={this.state.monthSelected.includes("1")}
            name={"Januray"}
          />
          &nbsp;&nbsp;
          January
        </label>
        <br/>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"2"}
            defaultChecked={this.state.monthSelected.includes("2")}
            name={"February"}

          />
          &nbsp;&nbsp;
          February
        </label>
        <br/>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"3"}
            defaultChecked={this.state.monthSelected.includes("3")}
            name={"March"}

          />
          &nbsp;&nbsp;
          March
        </label>
        <br/>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"4"}
            name={"April"}
            defaultChecked={this.state.monthSelected.includes("4")}
          />
          &nbsp;&nbsp;
          April
        </label>
        <br/>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"5"}
            name={"May"}
            defaultChecked={this.state.monthSelected.includes("5")}
          />
          &nbsp;&nbsp;
          May
        </label>
        <br/>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"6"}
            name={"June"}
            defaultChecked={this.state.monthSelected.includes("6")}
          />
          &nbsp;&nbsp;
          June
        </label>
        <br/>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"7"}
            name={"July"}
            defaultChecked={this.state.monthSelected.includes("7")}
          />
          &nbsp;&nbsp;
          July
        </label>
        <br/>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"8"}
            name={"August"}
            defaultChecked={this.state.monthSelected.includes("8")}
          />
          &nbsp;&nbsp;
          August
        </label>
        <br/>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"9"}
            name={"September"}
            defaultChecked={this.state.monthSelected.includes("9")}
          />
          &nbsp;&nbsp;
          September
        </label>
        <br/>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"10"}
            name={"October"}
            defaultChecked={this.state.monthSelected.includes("10")}
          />
          &nbsp;&nbsp;
          October
        </label>
        <br/>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"11"}
            name={"November"}
            defaultChecked={this.state.monthSelected.includes("11")}
          />
          &nbsp;&nbsp;
          November
        </label>
        <br/>
        <label>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"12"}
            name={"December"}
            defaultChecked={this.state.monthSelected.includes("12")}
          />
          &nbsp;&nbsp;
          December
        </label>
      </div>
    );
  }
}

export default MonthApp
