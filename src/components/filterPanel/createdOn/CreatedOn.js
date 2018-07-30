import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

/**
 * This example allows you to set a date range, and to toggle `autoOk`, and `disableYearSelection`.
 */
 const minDate = new Date();
 const maxDate = new Date();
 class DatePickerExampleToggle extends React.Component {
  constructor(props) {
    super(props);
    minDate.setFullYear(1800);
    minDate.setMonth(0);
    minDate.setDate(1);
    maxDate.setFullYear(maxDate.getFullYear());

    this.state = {
      minDate:minDate,
      maxDate: maxDate,
      autoOk: true,
      disableYearSelection: false,
    };

    this.handleChangeMinDate = this.handleChangeMinDate.bind(this);
    this.handleChangeMaxDate = this.handleChangeMaxDate.bind(this);
  }

  handleChangeMinDate (event, date)  {

    let endDate=this.state.maxDate;
    let startDate=date;
    console.log("from min");
    console.log(startDate);
    console.log(endDate);
    if(moment(startDate,moment.HTML5_FMT.DATETIME_LOCAL).format("YYYY-MM-DD")>moment(endDate,moment.HTML5_FMT.DATETIME_LOCAL).format("YYYY-MM-DD")){
      alert("Start date should be before the End date")
    }
    else{
      var event = new CustomEvent("created-on-filter", {
          "detail": {
            createdOnMinDate:moment(startDate,moment.HTML5_FMT.DATETIME_LOCAL).format("YYYY-MM-DD"),
            createdOnMaxDate:moment(endDate,moment.HTML5_FMT.DATETIME_LOCAL).format("YYYY-MM-DD")
          }
        });
        document.dispatchEvent(event);
        this.setState({
          minDate:new Date(startDate),
          maxDate:new Date(endDate)
        })
    }

  };
  handleChangeMaxDate (event, date)  {
    let endDate=date;
    let startDate=this.state.minDate;
    console.log("from max");
    console.log(startDate);
    console.log(endDate);
    if(moment(startDate,moment.HTML5_FMT.DATETIME_LOCAL).format("YYYY-MM-DD")>moment(endDate,moment.HTML5_FMT.DATETIME_LOCAL).format("YYYY-MM-DD")){
      alert("Start date should be before the End date")
    }
    else{
      var event = new CustomEvent("created-on-filter", {
          "detail": {
            createdOnMinDate:moment(startDate,moment.HTML5_FMT.DATETIME_LOCAL).format("YYYY-MM-DD"),
            createdOnMaxDate:moment(endDate,moment.HTML5_FMT.DATETIME_LOCAL).format("YYYY-MM-DD")
          }
        });
        document.dispatchEvent(event);
        this.setState({
          minDate:new Date(startDate),
          maxDate:new Date(endDate)
        });
    }

  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    let minDate;
    let maxDate;
    if (newparams.createdOnMaxDate && newparams.createdOnMinDate) {
    maxDate = new Date(newparams.createdOnMaxDate);
    minDate=new Date(newparams.createdOnMinDate);
    this.setState({
      minDate,
      maxDate
    })
    }
  }
  componentDidMount(){
    this.setParameter();
  }
  render() {
    return (
      <div>
        <div style={optionsStyle}>
          <DatePicker
            onChange={this.handleChangeMinDate}
            autoOk={this.state.autoOk}
            floatingLabelText="Min Date"
            value={this.state.minDate}
            defaultDate={this.state.minDate}
            minDate={minDate}
            maxDate={maxDate}
            disableYearSelection={this.state.disableYearSelection}
            formatDate={(date) => moment(date).format('DD-MM-YYYY')}
          />
          <DatePicker
            onChange={this.handleChangeMaxDate}
            autoOk={this.state.autoOk}
            floatingLabelText="Max Date"
            value={this.state.maxDate}
            defaultDate={this.state.maxDate}
            minDate={minDate}
            maxDate={maxDate}
            disableYearSelection={this.state.disableYearSelection}
            formatDate={(date) => moment(date).format('DD-MM-YYYY')}
          />
        </div>
      </div>
    );
  }
}
export default withRouter(DatePickerExampleToggle);
