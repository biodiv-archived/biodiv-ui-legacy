import React from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import 'rc-checkbox/assets/index.css';
import StatCounter from '../counter';

class FlaggedFilter extends React.Component {

   constructor(){
    super();
    this.state={
      isFlagged:[]
    }

  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
      let data=[];
    if (newparams.isFlagged) {
       data = newparams.isFlagged.split(",");
    }
    else{
      data=[];
    }
    this.setState({
      isFlagged:data
    })
  }
  componentDidMount(){
    this.setParameter();

  }


  handleCheckboxes(event){
    let isFlagged=this.state.isFlagged;
    if(event.target.checked){
      isFlagged.push(event.target.value);
      let set=new Set(isFlagged);
      isFlagged=Array.from(set);
      set.clear();
    }
    else{
      let set =new Set(isFlagged);
      set.delete(event.target.value);
      isFlagged=Array.from(set);
      set.clear();
    }
    this.setState({
      isFlagged
    })

       let events = new CustomEvent("flag-filter",{ "detail":{
           isFlagged:isFlagged
       }
       });
       document.dispatchEvent(events);

         event.preventDefault();

  }
  render() {
    return (
      <div>
        {this.props.stat && (<>
          <div>
              <Checkbox
                  checked={this.state.isFlagged.includes("0")?true:false}
                  value={"0"}
                  onChange={this.handleCheckboxes.bind(this)}
              /> {this.props.LocaleData['filter.dataQuality.flag.unFlagged']} <StatCounter count={this.props.stat["0"]} />
          </div>
          <div>
              <Checkbox
                checked={this.state.isFlagged.includes("1")?true:false}
                  value={"1"}
                  onChange={this.handleCheckboxes.bind(this)}
              /> {this.props.LocaleData['filter.dataQuality.flag.flagged']} <StatCounter count={this.props.stat["1"]} />
          </div>
        </>)}
      </div>
    )
  }
}
function mapStateToProps(state) {

  return {
    stat: state.Observation.stats
      ? state.Observation.stats.groupFlag
      : null,
    LocaleData:state.LocaleData
  };
}
export default withRouter(connect(mapStateToProps)(FlaggedFilter));
