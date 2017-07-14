import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import {fetchSpeciesChart} from '../actions/index';
class SpeciesChart extends Component{

componentDidMount(){
this.props.fetchSpeciesChart();
}

  render(){
  console.log(this.props.ChartData.data)
    return (
      <div>

      </div>
    )
  }
}


function mapStateToProps(state){
return {ChartData:state.ChartData};
}

export default connect(mapStateToProps,{fetchSpeciesChart})(SpeciesChart);
