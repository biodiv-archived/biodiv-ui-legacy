import React,{Component} from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import {NavLink,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import './TraitsObvStyle.css'
import 'rc-checkbox/assets/index.css';
import {getTraitValues} from './TraitsApiCall';
import { ROOT_URL } from '../Config';
import StatCounter from '../components/filterPanel/counter';

class Single extends Component{

  constructor(){
    super();
    this.state={
      traitValueList:[],
      traitSelectedValues:[]
    }

  }

  callFilter(id,traitSelectedValues){
      this.props.passToTraitValues("string",id,traitSelectedValues);
  }

  onChange(e){
    let traitSelectedValues=this.state.traitSelectedValues;
    if(e.target.checked){
      traitSelectedValues.push(e.target.traitValue)
    }
    else{
      traitSelectedValues=traitSelectedValues.filter((i)=> {
        return i != e.target.traitValue
      });
    }

  this.callFilter(this.props.traitId,traitSelectedValues);
    this.setState({
      traitSelectedValues
    })
  }
  setParameter(traitId){
    let newparams = queryString.parse(document.location.search);
    Object.keys(newparams).forEach((key)=> {
      if(key.includes("trait_"+traitId+".string")){
      this.setState({
        traitSelectedValues:newparams[key].split(",")
      })
      }
    });
  }
  componentDidMount(){
    let {traitId}=this.props;
    this.setParameter(traitId);
  getTraitValues(traitId,this.props.Locale).then(data=>{
    this.setState({
      traitValueList:data,
    })
    })
  }

  render(){
      let traitValueList=this.state.traitValueList;
      let traitSelectedValues=this.state.traitSelectedValues;
      return(
        <div>
          {traitValueList.data?traitValueList.data.map((item,index)=>(
            <div key={index}>
              <Checkbox
                defaultChecked={traitSelectedValues.includes(item.value) ? true : false}
                onChange={this.onChange.bind(this)}
                traitValue={item.value}
                traitId={item.traitId}
              />
              <img
                className="traitHover"
                src={`${ROOT_URL}/biodiv/traits${item.icon}`}
                alt={item.value}
                height="30px"
                width="30px"
              />
              {`${item.value}`}
              <StatCounter count={this.props.traitStat[item.value]} />
            </div>
              )):null}
        </div>
      )
    }
}
function mapStateToProps(state) {
  return {
    Locale:state.Locale
  }
}
export default withRouter(connect(mapStateToProps,null)(Single));
