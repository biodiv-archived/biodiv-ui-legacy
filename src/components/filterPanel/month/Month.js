import React from 'react';
import style from './Month.css';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import queryString from 'query-string';

import {withRouter} from 'react-router-dom';


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
  componentDidMount(){
      this.setParameter();
    
  }

  setParameter(){
    const newparams = queryString.parse(document.location.search);
    let data=[];
    if (newparams.months) {
      data = newparams.months.split(",");
    }
    else{
      data=[];
    }
    this.setState({
      monthSelected:data
    })
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
        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"1"}
            checked={this.state.monthSelected.includes("1")}
            name={"Januray"}
          />
          &nbsp;
          January
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"2"}
            checked={this.state.monthSelected.includes("2")}
            name={"February"}
          />
          &nbsp;
          February
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"3"}
            checked={this.state.monthSelected.includes("3")}
            name={"March"}
          />
          &nbsp;
          March
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"4"}
            name={"April"}
            checked={this.state.monthSelected.includes("4")}
          />
          &nbsp;
          April
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"5"}
            name={"May"}
            checked={this.state.monthSelected.includes("5")}
          />
          &nbsp;
          May
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"6"}
            name={"June"}
            checked={this.state.monthSelected.includes("6")}
          />
          &nbsp;
          June
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"7"}
            name={"July"}
            checked={this.state.monthSelected.includes("7")}
          />
          &nbsp;
          July
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"8"}
            name={"August"}
            checked={this.state.monthSelected.includes("8")}
          />
          &nbsp;
          August
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"9"}
            name={"September"}
            checked={this.state.monthSelected.includes("9")}
          />
          &nbsp;
          September
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"10"}
            name={"October"}
            checked={this.state.monthSelected.includes("10")}
          />
          &nbsp;
          October
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"11"}
            name={"November"}
            checked={this.state.monthSelected.includes("11")}
          />
          &nbsp;
          November
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"12"}
            name={"December"}
            checked={this.state.monthSelected.includes("12")}
          />
          &nbsp;
          December
        </div>
      </div>
    );
  }
}

export default withRouter(MonthApp);
