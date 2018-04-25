import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import queryString from 'query-string';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};


 let minDate = new Date();
 let maxDate = new Date();
export default class DatePickerExampleToggle extends React.Component {
  constructor(props) {
    super(props);
    minDate.setFullYear(2017);
    minDate.setMonth(0);
    minDate.setDate(1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(2017);
    maxDate.setMonth(11);
    maxDate.setDate(31);
    maxDate.setHours(0, 0, 0, 0);
    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: true,
      disableYearSelection: true,
      traitSelectedValues:[]
    };

    this.handleChangeMinDate = this.handleChangeMinDate.bind(this);
    this.handleChangeMaxDate = this.handleChangeMaxDate.bind(this);
  }

  handleChangeMinDate (event, date)  {
    let traitSelectedValues=this.state.traitSelectedValues;
    let id=this.props.traitId;

    let endDate=this.state.maxDate.toISOString();
    let startDate=date.toISOString();
    if(startDate>endDate){
      alert("Start date should be before the End date")
    }
    else{
      traitSelectedValues[0]=startDate;
      traitSelectedValues[1]=endDate;
      this.props.passToTraitValues("season",id,traitSelectedValues);
    }
    this.setState({
      minDate:new Date(startDate),
      maxDate:new Date(endDate)
    })
  };
  handleChangeMaxDate (event, date)  {
    let traitSelectedValues=this.state.traitSelectedValues;
    let id=this.props.traitId;
    let endDate=date.toISOString();
    let startDate=this.state.minDate.toISOString();
    if(startDate>endDate){
      alert("Start date should be before the End date")
    }
    else{
      traitSelectedValues[0]=startDate;
      traitSelectedValues[1]=endDate;
      this.props.passToTraitValues("season",id,traitSelectedValues);
    }
    this.setState({
      minDate:new Date(startDate),
      maxDate:new Date(endDate)
    })

  }
  setParameter(traitId){
    let newparams = queryString.parse(document.location.search);
    Object.keys(newparams).forEach((key)=> {
      if(key.includes("trait_"+traitId+".season")){
        let minNewDate=new Date(newparams[key].split(",")[0]);
        let maxNewDate=new Date(newparams[key].split(",")[1]);

      this.setState({
        minDate:minNewDate,
        maxDate:maxNewDate
      })
      }
    });
  }
  componentDidMount(){
    let {traitId}=this.props;
    this.setParameter(traitId);
  }


  render() {
    console.log(this.state.minDate);
    console.log(this.state.maxDate);
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
            hideCalendarDate={true}
            formatDate={(date) => moment(date).format('DD MMMM')}
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
            hideCalendarDate={true}

            formatDate={(date) => moment(date).format('DD MMMM')}
          />
        </div>
      </div>
    );
  }
}
