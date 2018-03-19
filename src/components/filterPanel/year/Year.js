import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

/**
 * This example allows you to set a date range, and to toggle `autoOk`, and `disableYearSelection`.
 */
export default class DatePickerExampleToggle extends React.Component {
  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(1800);
    minDate.setMonth(0);
    minDate.setDate(1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

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
      var event = new CustomEvent("year-filter", {
          "detail": {
            maxDate: encodeURIComponent(endDate),
            minDate:encodeURIComponent(startDate)
          }
        });
        document.dispatchEvent(event);

        this.setState({
          minDate: date,
        });
    }
  };
  handleChangeMaxDate (event, date)  {
    let endDate=date;
    let startDate=this.state.minDate;

    if(startDate>endDate){
      alert("Start date should be before the End date")
    }
    else{
      var event = new CustomEvent("year-filter", {
          "detail": {
            maxDate: encodeURIComponent(endDate),
            minDate:encodeURIComponent(startDate)
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
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            disableYearSelection={this.state.disableYearSelection}
            formatDate={(date) => moment(date).format('DD-MM-YYYY')}
          />
          <DatePicker
            onChange={this.handleChangeMaxDate}
            autoOk={this.state.autoOk}
            floatingLabelText="Max Date"
            defaultDate={this.state.maxDate}
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            disableYearSelection={this.state.disableYearSelection}
            formatDate={(date) => moment(date).format('DD-MM-YYYY')}
          />
        </div>
      </div>
    );
  }
}
