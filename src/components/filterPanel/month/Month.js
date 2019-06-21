import React from "react";
import style from "./Month.css";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
import queryString from "query-string";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import _ from "lodash";

function remove(array, element) {
  return array.filter(e => e !== element);
}
class MonthApp extends React.Component {
  MONTH_NAMES = [
    { id: "1", title: "Januray", key: "january" },
    { id: "2", title: "February", key: "february" },
    { id: "3", title: "March", key: "march" },
    { id: "4", title: "April", key: "april" },
    { id: "5", title: "May", key: "may" },
    { id: "6", title: "June", key: "june" },
    { id: "7", title: "July", key: "july" },
    { id: "8", title: "August", key: "august" },
    { id: "9", title: "September", key: "september" },
    { id: "10", title: "October", key: "october" },
    { id: "11", title: "November", key: "november" },
    { id: "12", title: "December", key: "december" }
  ];

  constructor(props) {
    super(props);

    this.state = {
      monthSelected: []
    };
  }
  componentDidMount() {
    this.setParameter();
  }

  setParameter() {
    const newparams = queryString.parse(document.location.search);
    let data = [];
    if (newparams.months) {
      data = newparams.months.split(",");
    } else {
      data = [];
    }
    this.setState({
      monthSelected: data
    });
  }

  onChange(e) {
    let id = e.target.id;
    let newMonthSelected = this.state.monthSelected;
    if (e.target.checked) {
      newMonthSelected.push(id);
    } else {
      newMonthSelected = remove(newMonthSelected, id);
    }
    newMonthSelected = Array.from(new Set(newMonthSelected));
    this.setState({
      monthSelected: newMonthSelected
    });

    var event = new CustomEvent("months-filter", {
      detail: {
        months: newMonthSelected
      }
    });
    document.dispatchEvent(event);
  }

  render() {
    return (
      <div>
        {this.props.stat &&
          this.MONTH_NAMES.map(m => (
            <div key={m.id}>
              <Checkbox
                onChange={this.onChange.bind(this)}
                id={m.id}
                name={m.title}
                checked={this.state.monthSelected.includes(m.id)}
              />
              &nbsp;
              {this.props.LocaleData[`filter.seasonal.${m.key}`]} <span className="filter--counter">
              {this.props.stat[m.id]}</span>
            </div>
          ))}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    stat: state.Observation.stats ? state.Observation.stats.groupMonth : null,
    LocaleData: state.LocaleData
  };
}
export default withRouter(connect(mapStateToProps)(MonthApp));
