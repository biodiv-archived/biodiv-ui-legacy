import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import {withRouter} from 'react-router-dom';

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
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);
    console.log(minDate);
    console.log(maxDate);
    this.state = {
      minDate: minDate,
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
    if(startDate>endDate){
      alert("Start date should be before the End date")
    }
    else{
      var event = new CustomEvent("created-on-filter", {
          "detail": {
            createdOnMaxDate: endDate.toISOString().substring(0,endDate.toISOString().length-1),
            createdOnMinDate:startDate.toISOString().substring(0,startDate.toISOString().length-1)
          }
        });
        document.dispatchEvent(event);
        this.setState({
          minDate: date,
        })
    }
  };
  handleChangeMaxDate (event, date)  {
    let endDate=date;
    let startDate=this.state.minDate;

    if(startDate>endDate){
      alert("Start date should be before the End date")
    }
    else{
      var event = new CustomEvent("created-on-filter", {
          "detail": {
            createdOnMaxDate: endDate.toISOString().substring(0,endDate.toISOString().length-1),
            createdOnMinDate:startDate.toISOString().substring(0,startDate.toISOString().length-1)
          }
        });
        document.dispatchEvent(event);
      this.setState({
        maxDate: date,
      });
    }
  }



  render() {
    return (
      <div>
        <div style={optionsStyle}>
          <DatePicker
            onChange={this.handleChangeMinDate}
            autoOk={this.state.autoOk}
            floatingLabelText="Min Date"
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
