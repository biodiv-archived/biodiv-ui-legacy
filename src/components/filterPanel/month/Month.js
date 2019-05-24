import React from 'react';
import style from './Month.css';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import queryString from 'query-string';
import {connect} from 'react-redux';
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
          {this.props.LocaleData['filter.seasonal.january']}
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"2"}
            checked={this.state.monthSelected.includes("2")}
            name={"February"}
          />
          &nbsp;
          {this.props.LocaleData['filter.seasonal.february']}
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"3"}
            checked={this.state.monthSelected.includes("3")}
            name={"March"}
          />
          &nbsp;
          {this.props.LocaleData['filter.seasonal.march']}

        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"4"}
            name={"April"}
            checked={this.state.monthSelected.includes("4")}
          />
          &nbsp;
          {this.props.LocaleData['filter.seasonal.april']}
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"5"}
            name={"May"}
            checked={this.state.monthSelected.includes("5")}
          />
          {this.props.LocaleData['filter.seasonal.may']}
          &nbsp;
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"6"}
            name={"June"}
            checked={this.state.monthSelected.includes("6")}
          />
          &nbsp;
          {this.props.LocaleData['filter.seasonal.june']}
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"7"}
            name={"July"}
            checked={this.state.monthSelected.includes("7")}
          />
          &nbsp;
          {this.props.LocaleData['filter.seasonal.july']}
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"8"}
            name={"August"}
            checked={this.state.monthSelected.includes("8")}
          />
          &nbsp;
          {this.props.LocaleData['filter.seasonal.august']}
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"9"}
            name={"September"}
            checked={this.state.monthSelected.includes("9")}
          />
          &nbsp;
          {this.props.LocaleData['filter.sesonal.september']}
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"10"}
            name={"October"}
            checked={this.state.monthSelected.includes("10")}
          />
          &nbsp;
          {this.props.LocaleData['filter.seasonal.october']}
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"11"}
            name={"November"}
            checked={this.state.monthSelected.includes("11")}
          />
          &nbsp;
          {this.props.LocaleData['filter.seasonal.november']}
        </div>

        <div>
          <Checkbox
            onChange={this.onChange.bind(this)}
            id={"12"}
            name={"December"}
            checked={this.state.monthSelected.includes("12")}
          />
          &nbsp;
          {this.props.LocaleData['filter.seasonal.december']}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    LocaleData:state.LocaleData
  };
}
export default withRouter(connect(mapStateToProps)(MonthApp));
