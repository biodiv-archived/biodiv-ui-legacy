import React from 'react';
import InputRange from 'react-input-range';
import Collapsible from 'react-collapsible';
import {NavLink,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import '../../node_modules/react-input-range/lib/css/index.css'
import {getAllTraits} from './TraitsApiCall';
import queryString from 'query-string';
import TraitValues from './TraitValues';

class Traits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      observationTraitList:[],
      traitIdwithValues:new Map()
    };
    this.passToTraitValues=this.passToTraitValues.bind(this)
  }
  setParameter(){
    let newparams = queryString.parse(document.location.search);
    let traitIdwithValues=this.state.traitIdwithValues;
    Object.keys(newparams).forEach((key)=> {
      if(key.includes("trait")){
        traitIdwithValues.set(key.split("_")[1],newparams[key].split(","));
      }
    });

      console.log(traitIdwithValues);
      this.setState({
        traitIdwithValues
      })

  }
  componentDidMount(){
      this.setParameter()
    getAllTraits(this.props.Locale).then(data=>{
      data.data = data.data.map(item =>
        item.hasOwnProperty("language")
          ? { ...item.trait, threeLetterCode: item.language.threeLetterCode }
          : {...item, threeLetterCode: "eng"}
      );
    this.setState({
      observationTraitList:data
    })
    })
  }
  callFilter(traitIdwithValues){
      var events = new CustomEvent("traits",{ "detail":{
        traitsMap:traitIdwithValues
      }
      });
       document.dispatchEvent(events);
  }

  passToTraitValues(type,id,values){
    let traitIdwithValues=this.state.traitIdwithValues;
    let newid=id+"."+type;
  traitIdwithValues.set(newid,values);

  this.setState({
  traitIdwithValues
  })
  this.callFilter(traitIdwithValues)
  }

  render() {
    let observationTraitList=this.state.observationTraitList;
    let traitIdwithValues=this.state.traitIdwithValues;
    let Comkeys = Array.from( traitIdwithValues.keys());
    let keys=[];
    if(Comkeys){
      Comkeys.map((item)=>{
        keys.push(item.split(".")[0])
      })
    }
    return (
      <div>
        {observationTraitList.data?observationTraitList.data.map((_t,index)=>{
          return(
            <div key={index}>
              <Collapsible  open={keys.includes(_t.id.toString())} trigger={_t.name}>
                {console.log("trait",_t)}
                <TraitValues
                  passToTraitValues={this.passToTraitValues}
                  language={_t.threeLetterCode}
                  traitId={_t.id}
                  traitName={_t.name}
                  traitType={_t.traitTypes}
                  traitDataType={_t.dataTypes}
                />
              </Collapsible>
            </div>
          )
        }):null}
      </div>
          );
  }
}

function mapStateToProps(state) {
  return {
    Locale:state.Locale
  }
}
export default withRouter(connect(mapStateToProps,null)(Traits ));
