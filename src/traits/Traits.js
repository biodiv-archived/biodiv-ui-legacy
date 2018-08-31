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
    getAllTraits("fr").then(data=>{
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
  componentWillReceiveProps(nextProps){
    console.log("kfsdhfklsd");
    console.log(nextProps);

  }
  render() {
    let observationTraitList=this.state.observationTraitList;
    let traitIdwithValues=this.state.traitIdwithValues;
    let Comkeys = Array.from( traitIdwithValues.keys());
    let keys=[];
      Comkeys?Comkeys.map((item)=>{
        keys.push(item.split(".")[0])
      }):null;
    return (
      <div>
          {observationTraitList.data?observationTraitList.data.map((item,index)=>{
            return(
              <div key={index}>
                <Collapsible  open={keys.includes(item.trait.id.toString())} trigger={item.name}>
                    <TraitValues  passToTraitValues={this.passToTraitValues}  language={item.language.threeLetterCode} traitId={item.trait.id}  traitName={item.trait.name} traitType={item.trait.traitTypes} traitDataType={item.trait.dataTypes}/>
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
