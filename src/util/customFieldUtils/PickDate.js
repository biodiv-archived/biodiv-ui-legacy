import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';

const optionsStyle = {
  // maxWidth: 255,
  // marginRight: 'auto',
  marginLeft:'1%'
};

/**
 * This example allows you to set a date range, and to toggle `autoOk`, and `disableYearSelection`.
 */
 const minDate = new Date();
 const maxDate = new Date();
export default class DatePickerCustomField extends React.Component {
  constructor(props) {
    super(props);


    minDate.setFullYear(1500);
    minDate.setMonth(0);
    minDate.setDate(1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);


    this.state = {
      date:maxDate,
      autoOk: true,
      disableYearSelection: false,
      hideCalendarDate:false
    };

    //this.handleChangeMinDate = this.handleChangeMinDate.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.resetDate =  this.resetDate.bind(this);
  }

  // static getDerivedStateFromProps(nextProps, prevState){
  //     //   if (this.state.visible === true && newProps.visible === false) {
  //     //      registerLog('dialog is hidden');
  //     //  }
  //     //   return {
  //     //          visible : nextProps.visible
  //     //   };
  //     console.log("agdambagdam",nextProps,prevState)
  //     return null;
  //   }

resetDate(){
  console.log("resetting date",this)
  this.setState({
    date:maxDate
  })
}

  // handleChangeMinDate (event, date)  {
  //
  //   let endDate=this.state.maxDate;
  //   let startDate=date;
  //   // if(startDate>endDate){
  //   //   alert("Start date should be before the End date")
  //   // }
  //   // else{
  //       this.setState({
  //         minDate: date,
  //       })
  //       this.props.pushTraitsDateRange(this.props.traitId,this.state.minDate,this.state.maxDate)
  //   // }
  // };
  handleChangeDate (event, date)  {
    let endDate=date;
    let startDate=this.state.minDate;

    // if(startDate>endDate){
    //   alert("Start date should be before the End date")
    // }
    // else{
      this.setState({
        date: date,
      });
      this.props.pushCustomFieldDateInput(this.props.cfId,this.state.date)
    // }
  }

  shouldDisableDate(date){
    return date.getFullYear()>minDate.getFullYear() || date.getFullYear()<minDate.getFullYear()
  }

  render() {
    return (
      <div>
        <div className="row" style={optionsStyle}>

          <DatePicker
            id={"dateIdCustomField"+this.props.obvId+this.props.cfId}
            onChange={this.handleChangeDate}
            autoOk={this.state.autoOk}

            defaultDate={this.state.date}
            minDate={minDate}
            maxDate={maxDate}
            disableYearSelection={this.state.disableYearSelection}
            formatDate={(date) => moment(date).format('DD-MM-YYYY')}
            hideCalendarDate={this.state.hideCalendarDate}
          />

        </div>
      </div>
    );
  }
}
