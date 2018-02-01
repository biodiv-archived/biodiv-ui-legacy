import React from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import Moment from 'react-moment';
import 'react-datepicker/dist/react-datepicker.css';

class ExampleApp extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      startDate:moment('01-01-1970',"DD/MM/YYYY"),
      endDate: moment()
    };
  }

handleChangeStart(date){
  this.setState({
    startDate:date
  })

  let endDate=this.state.endDate;
  let startDate=date;




  var event = new CustomEvent("year-filter", {
      "detail": {
        maxDate: encodeURIComponent(endDate),
        minDate:encodeURIComponent(startDate)
      }
    });
    document.dispatchEvent(event);
}
handleChangeEnd(date){

  this.setState({
    endDate:date
  })
  let endDate=date;
  let startDate=this.state.startDate;


  encodeURIComponent(endDate);
  var event = new CustomEvent("year-filter", {
      "detail": {
        maxDate: encodeURIComponent(endDate),
        minDate:encodeURIComponent(startDate)
      }
    });
    document.dispatchEvent(event);
}
  render() {
    return (
      <div>
          {"From"}
          <DatePicker
          dateFormat="DD/MM/YYYY"
          selected={this.state.startDate}
          showYearDropdown
          showMonthDropdown
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart.bind(this)}
          isClearable={true}
          placeholderText="Select start Date"
      />
          {"To"}
          <DatePicker
              dateFormat="DD/MM/YYYY"
              selected={this.state.endDate}
              selectsEnd
              showYearDropdown
              showMonthDropdown
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd.bind(this)}
              isClearable={true}
              placeholderText="Select end Date"
          />
  </div>
    );
  }
}

export default ExampleApp
