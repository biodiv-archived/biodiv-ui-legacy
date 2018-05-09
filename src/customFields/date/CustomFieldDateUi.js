import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
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
export default class CustomFieldDateUi extends React.Component {
  constructor(props) {
    super(props);
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
      CustomFieldsValues:[]
    };

    this.handleChangeMinDate = this.handleChangeMinDate.bind(this);
    this.handleChangeMaxDate = this.handleChangeMaxDate.bind(this);
  }

  handleChangeMinDate (event, date)  {
    let CustomFieldsValues=this.state.CustomFieldsValues;
    let customFieldId=this.props.customFieldId;

    let endDate=this.state.maxDate.toISOString();;
    let startDate=date.toISOString();;
    if(startDate>endDate){
      alert("Start date should be before the End date")
    }
    else{
      CustomFieldsValues[0]=startDate;
      CustomFieldsValues[1]=endDate;
      this.props.passToCustomFieldValues("date",customFieldId,CustomFieldsValues);
    }
  };
  handleChangeMaxDate (event, date)  {
    let customFieldId=this.props.customFieldId;
      let CustomFieldsValues=this.state.CustomFieldsValues;
    let endDate=date.toISOString();;
    let startDate=this.state.minDate.toISOString();;

    if(startDate>endDate){
      alert("Start date should be before the End date")
    }
    else{
      CustomFieldsValues[0]=startDate;
      CustomFieldsValues[1]=endDate;
      this.props.passToCustomFieldValues("date",customFieldId,CustomFieldsValues);
    }

  }
  setParameter(customFieldId){
    let newparams = queryString.parse(document.location.search);
    let customName="custom_"+customFieldId+".range";
    Object.keys(newparams).forEach((key)=> {
  if(key.includes("custom_"+customFieldId+".range")){
        let min=parseInt(newparams[key].split(",")[0]);
        let max=parseInt(newparams[key].split(",")[1]);
        let value={
          min:min,
          max:max
        };
        this.setState({
          value:value
        })
      }

    });
  }

  componentDidMount(){
  let customFieldId=this.props.customFieldId;
  this.setParameter(customFieldId);
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
