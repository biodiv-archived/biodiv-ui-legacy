import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';

const optionsStyle = {
};

/**
 * This example allows you to set a date range, and to toggle `autoOk`, and `disableYearSelection`.
 */
 const minDate = new Date();
 const maxDate = new Date();
export default class DatePickerExampleToggle extends React.Component {
  constructor(props) {
    super(props);


    minDate.setFullYear(1900);
    minDate.setMonth(0);
    minDate.setDate(1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(1900);
    maxDate.setMonth(11);
    maxDate.setDate(31);


    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: true,
      disableYearSelection: this.props.units==="month"?true:false,
      hideCalendarDate:true
    };

    this.handleChangeMinDate = this.handleChangeMinDate.bind(this);
    this.handleChangeMaxDate = this.handleChangeMaxDate.bind(this);
  }

  handleChangeMinDate (event, date)  {

    let endDate=this.state.maxDate;
    let startDate=date;
    // if(startDate>endDate){
    //   alert("Start date should be before the End date")
    // }
    // else{
        this.setState({
          minDate: date,
        })
        this.props.pushTraitsDateRange(this.props.traitId,this.state.minDate,this.state.maxDate)
    // }
  };
  handleChangeMaxDate (event, date)  {
    let endDate=date;
    let startDate=this.state.minDate;

    // if(startDate>endDate){
    //   alert("Start date should be before the End date")
    // }
    // else{
      this.setState({
        maxDate: date,
      });
      this.props.pushTraitsDateRange(this.props.traitId,this.state.minDate,this.state.maxDate)
    // }
  }

  shouldDisableDate(date){
    return date.getFullYear()>minDate.getFullYear() || date.getFullYear()<minDate.getFullYear()
  }

  render() {
    return (
      <div>
        <div className="row" style={optionsStyle}>
          <div className="col-sm-6">
          <DatePicker
            onChange={this.handleChangeMinDate}
            autoOk={this.state.autoOk}
            floatingLabelText="From Date"
            defaultDate={this.state.minDate}
            minDate={minDate}
            maxDate={maxDate}
            disableYearSelection={this.state.disableYearSelection}
            formatDate={(date) => moment(date).format('MMM DD')}
            hideCalendarDate={this.state.hideCalendarDate}

          />
          </div>
          <div className="col-sm-6">

          <DatePicker
            onChange={this.handleChangeMaxDate}
            autoOk={this.state.autoOk}
            floatingLabelText="To Date"
            defaultDate={this.state.maxDate}
            minDate={minDate}
            maxDate={maxDate}
            disableYearSelection={this.state.disableYearSelection}
            formatDate={(date) => moment(date).format('MMM DD')}
            hideCalendarDate={this.state.hideCalendarDate}
          />

          </div>
        </div>
      </div>
    );
  }
}
