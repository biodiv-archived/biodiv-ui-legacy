import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Chart } from 'react-google-charts';
import {BarChart} from 'react-easy-chart';
import {fetchSpeciesChart} from '../actions/index';

class SpeciesChart extends Component{


componentWillMount(){
this.props.fetchSpeciesChart();
};
render(){

const coldata =this.props.ChartData.columns;
const rowdata=this.props.ChartData.data;
let rowitems=[];
for(let d in rowdata)
{
  let arr=[];
    arr[0]=rowdata[d][1]
    arr[1]=rowdata[d][2]
    rowitems.push(arr);
}
console.log(rowitems)
 let colitems=[];
 for(let d in coldata)
 {
   if(d==0)
   continue
   let item={};
   item.type=coldata[d][0];
   item.label=coldata[d][1];
   colitems.push(item)
 }
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
